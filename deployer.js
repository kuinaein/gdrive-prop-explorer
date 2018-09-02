const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

switch (process.argv[2]) {
  case 'deploy':
    deploy();
    break;

  case 'serve':
    serve();
    break;

  case 'open':
    openScriptEditor();
    break;

  default:
    throw new Error('未知のコマンド: ' + process.argv[2]);
}

/** Apps Scriptとしてデプロイ */
function deploy() {
  callClasp('login');
  const doesCreate = !fs.existsSync(path.join(__dirname, '.clasp.json'));
  if (doesCreate) {
    const projectName = process.env['PROJECT_NAME'];
    const parentId = process.env['PROJECT_PARENT_ID'];
    if (parentId && '' !== parentId) {
      callClasp('create', projectName, parentId);
    } else {
      callClasp('create', projectName);
    }
  }
  callClasp('push');
  callClasp('open'); // スクリプトエディタを開く
}

/** Webアプリとして実行 */
function serve() {
  callClasp('open', '--webapp');
}

/** スクリプトエディタを開く */
function openScriptEditor() {
  callClasp('open');
}

/** claspを呼び出す */
function callClasp(...args) {
  spawnSync(
    'node',
    [path.join(__dirname, 'node_modules/.bin/clasp')].concat(args),
    {
      cwd: path.join(__dirname, 'src'),
      stdio: 'inherit',
    }
  );
}
