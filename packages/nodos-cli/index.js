const importFrom = require('import-from');
const runCurrent = require('./lib/current.js');
const runNew = require('./lib/new.js');
const log = require('./lib/logger.js');

module.exports = {
  runNew,
  runCurrent,
  run(projectRoot) {
    const core = importFrom.silent(projectRoot, '@nodosjs/core');
    log(projectRoot);
    log(core);

    if (core) {
      const app = core.nodos(projectRoot);
      runCurrent(app);
    } else {
      runNew();
    }
  },
};
