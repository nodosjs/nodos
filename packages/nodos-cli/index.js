const importFrom = require('import-from');
const runCurrent = require('./lib/current.js');
const runNew = require('./lib/new.js');
const log = require('./lib/logger.js');

module.exports = {
  runNew,
  runCurrent,
  run(dir) {
    const core = importFrom.silent(dir, '@nodosjs/core');
    log(dir);
    log(core);

    if (core) {
      const app = core.nodos(dir);
      runCurrent(app);
    } else {
      runNew(dir);
    }
  },
};
