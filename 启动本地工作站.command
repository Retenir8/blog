#!/bin/zsh
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  export PATH="/Users/retenir/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
fi
if ! command -v node >/dev/null 2>&1; then
  echo '需要 Node.js 22.13 或以上版本。安装后再打开此文件。'
  read -r '?按回车退出'
  exit 1
fi
echo '启动后在浏览器打开 http://127.0.0.1:4317'
node workstation/server.mjs
read -r '?工作站已停止，按回车关闭窗口'
