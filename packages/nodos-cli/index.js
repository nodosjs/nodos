const importFrom = require('import-from');
const semver = require('semver');
const runCurrent = require('./lib/current.js');
const runNew = require('./lib/new.js');
const log = require('./lib/logger.js');

module.exports = {
  runNew,
  runCurrent,
  run(dir, options = {}) {
    if (semver.lt(process.versions.node, '14.0.0')) {
      throw new Error('You need at least Node v14 to work with nodos');
    }
    const core = importFrom.silent(dir, '@nodosjs/core');
    log(dir);
    log(core);

    if (core) {
      const app = core.nodos(dir, { mode: 'console' });
      runCurrent(app, options);
    } else {
      runNew(dir, options);
    }
  },
};
