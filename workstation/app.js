const $ = (id) => document.getElementById(id);
let token = '',
  dirty = false,
  busy = false;
const mark = () => {
  dirty = true;
  $('dirty').textContent = '有未保存修改';
  $('handoff-panel').hidden = true;
};
for (const id of ['source', 'slug', 'notes'])
  $(id).addEventListener('input', mark);
window.addEventListener('beforeunload', (e) => {
  if (dirty) {
    e.preventDefault();
    e.returnValue = '';
  }
});
function status(text, error = false) {
  $('status').textContent = text;
  $('status').className = error ? 'error' : '';
}
async function api(url, data) {
  const response = await fetch(
    url,
    data
      ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Workstation-Token': token,
          },
          body: JSON.stringify(data),
        }
      : {},
  );
  const value = await response.json();
  if (!response.ok) throw new Error(value.error);
  return value;
}
function input() {
  return {
    source: $('source').value,
    slug: $('slug').value.trim(),
    notes: $('notes').value.trim(),
  };
}
async function action(fn) {
  if (busy) return;
  busy = true;
  document
    .querySelectorAll('button,input,textarea')
    .forEach((b) => (b.disabled = true));
  try {
    await fn();
  } catch (e) {
    status(e.message, true);
  } finally {
    busy = false;
    document
      .querySelectorAll('button,input,textarea')
      .forEach((b) => (b.disabled = false));
  }
}
async function preview() {
  const result = await api('/api/preview', input());
  $('preview').srcdoc = result.html;
  $('checks').replaceChildren();
  for (const [kind, list] of [
    ['error', result.errors],
    ['warning', result.warnings],
  ])
    for (const text of list) {
      const p = document.createElement('p');
      p.className = kind;
      p.textContent = (kind === 'error' ? '需修改：' : '提醒：') + text;
      $('checks').append(p);
    }
  status(
    result.errors.length
      ? '检查发现问题；仍可保存草稿。'
      : '必填检查通过。请确认内容与图片后保存到待发布。',
  );
  return result;
}
function confirmReplace() {
  return !dirty || window.confirm('编辑区有未保存内容，确定替换吗？');
}
async function load(source, slug = 'my-first-note', notes = '') {
  $('source').value = source;
  $('slug').value = slug;
  $('notes').value = notes;
  mark();
  await preview();
}
async function refresh() {
  const items = await api('/api/list');
  $('library').replaceChildren();
  for (const [kind, label] of [
    ['ready', '待发布'],
    ['drafts', '草稿版本'],
    ['templates', '我的模板'],
  ]) {
    const heading = document.createElement('h3');
    heading.className = 'group-title';
    heading.textContent = label;
    $('library').append(heading);
    const records = items.filter((x) => x.kind === kind);
    if (!records.length) {
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent = '还没有内容';
      $('library').append(p);
    }
    for (const item of records) {
      const button = document.createElement('button');
      button.className = 'record';
      button.textContent = item.title;
      const small = document.createElement('small');
      small.textContent = new Date(item.created).toLocaleString('zh-CN');
      button.append(small);
      button.onclick = () =>
        action(async () => {
          if (!confirmReplace()) return;
          const record = await api(`/api/item?kind=${item.kind}&id=${item.id}`);
          await load(record.source, item.slug, item.notes);
          dirty = false;
          $('dirty').textContent = '已加载本地版本';
          if (record.handoff) {
            $('handoff').value = record.handoff;
            $('handoff-panel').hidden = false;
          }
        });
      $('library').append(button);
    }
  }
}
async function save(kind) {
  if (!$('source').value.trim()) throw new Error('请先输入或导入正文。');
  await preview();
  const result = await api('/api/save', { ...input(), kind });
  dirty = false;
  $('dirty').textContent = '已保存到本机';
  status(
    `已保存${kind === 'ready' ? '到待发布（尚未上线）' : ''}：\n${result.path}`,
  );
  if (result.handoff) {
    $('handoff').value = result.handoff;
    $('handoff-panel').hidden = false;
  }
  await refresh();
}
$('new').onclick = () =>
  action(async () => {
    if (!confirmReplace()) return;
    const response = await fetch('/template.md');
    const template = (await response.text()).replace(
      /date: '[^']+'/,
      'date: ' + JSON.stringify(new Date().toLocaleDateString('en-CA')),
    );
    await load(template);
  });
for (const [id, template] of [
  ['import', false],
  ['import-template', true],
])
  $(id).onchange = () =>
    action(async () => {
      const file = $(id).files[0];
      $(id).value = '';
      if (!file) return;
      if (!/\.mdx?$/i.test(file.name))
        throw new Error('请选择 .md 或 .mdx 文件。');
      if (file.size > 1024 * 1024) throw new Error('文件不能超过 1 MB。');
      if (!confirmReplace()) return;
      const suggested = file.name.replace(/\.mdx?$/i, '').toLowerCase();
      await load(
        await file.text(),
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(suggested)
          ? suggested
          : 'my-first-note',
      );
      if (template) await save('templates');
    });
$('check').onclick = () => action(preview);
$('draft').onclick = () => action(() => save('drafts'));
$('template').onclick = () => action(() => save('templates'));
$('ready').onclick = () => action(() => save('ready'));
$('refresh').onclick = () => action(refresh);
$('download').onclick = () => {
  const blob = new Blob([$('source').value], {
    type: 'text/markdown;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download =
    (/^[a-z0-9-]+$/.test($('slug').value) ? $('slug').value : 'article') +
    '.md';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$('copy').onclick = () =>
  action(async () => {
    try {
      await navigator.clipboard.writeText($('handoff').value);
      status('交付说明已复制。发送给我后，我会检查并发布。');
    } catch {
      $('handoff').focus();
      $('handoff').select();
      status('请手动复制已选中的交付说明。');
    }
  });
action(async () => {
  const session = await api('/api/session');
  token = session.token;
  $('folder').textContent = session.dataDir;
  await refresh();
});
