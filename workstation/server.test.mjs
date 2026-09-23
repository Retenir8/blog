import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { createWorkstation, inspect } from './server.mjs';

const sample = await readFile(
  new URL('./template.md', import.meta.url),
  'utf8',
);
test('检查字段、日期、路径与不受信任 YAML', () => {
  assert.equal(inspect(sample, 'test-note').errors.length, 0);
  assert.ok(inspect(sample, '../../outside').errors.length);
  assert.ok(
    inspect(sample.replace('2026-09-21', '2026-02-30'), 'test').errors.length,
  );
  assert.ok(inspect('---\n[]\n---\nbody', 'test').errors.length);
  assert.ok(inspect('plain markdown', 'test').errors.length);
  assert.ok(inspect(sample + '\n![[test.png]]', 'test').warnings.length);
});
test('仅本地接口、预览隔离、独立保存及交付', async () => {
  const dataDir = await mkdtemp(
    path.join(os.tmpdir(), 'blog-workstation-test-'),
  );
  const server = createWorkstation({ dataDir });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const hostileHost = await new Promise((resolve) =>
      http.get(base, { headers: { Host: 'evil.example' } }, (res) => {
        res.resume();
        resolve(res.statusCode);
      }),
    );
    assert.equal(hostileHost, 403);
    assert.equal(
      (
        await fetch(base + '/api/session', {
          headers: { Origin: 'https://evil.example' },
        })
      ).status,
      403,
    );
    const { token } = await (await fetch(base + '/api/session')).json();
    const post = (endpoint, data, headers = {}) =>
      fetch(base + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Workstation-Token': token,
          ...headers,
        },
        body: JSON.stringify(data),
      });
    assert.equal(
      (
        await post(
          '/api/save',
          { source: sample, kind: 'ready', slug: 'test' },
          { 'X-Workstation-Token': 'invalid' },
        )
      ).status,
      403,
    );
    const view = await (
      await post('/api/preview', {
        source: sample + '\n<script>alert(1)</script>',
        slug: 'test',
      })
    ).json();
    assert.ok(!view.html.includes('<script>'));
    assert.ok(view.html.includes('katex'));
    assert.equal(
      (
        await post('/api/save', {
          source: 'unfinished',
          slug: 'test',
          kind: 'ready',
        })
      ).status,
      422,
    );
    const first = await (
      await post('/api/save', { source: sample, slug: 'test', kind: 'ready' })
    ).json();
    const second = await (
      await post('/api/save', { source: sample, slug: 'test', kind: 'ready' })
    ).json();
    assert.notEqual(first.path, second.path);
    assert.ok(first.handoff.includes('published: true'));
    assert.equal(await readFile(first.path, 'utf8'), sample);
    assert.equal((await (await fetch(base + '/api/list')).json()).length, 2);
    assert.equal(
      (await fetch(base + '/api/item?kind=../&id=../../')).status,
      400,
    );
    assert.equal((await readdir(path.join(dataDir, 'ready'))).length, 6);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
