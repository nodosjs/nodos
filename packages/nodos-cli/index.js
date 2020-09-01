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
      // FIXME: runNew должен запускаться тогда, когда мы явно делаем new. В остальных случаях надо падать с ошибкой. А то щас я пытался сервак запустить, а у меня пыталось выполниться new, вот это я прифигел.
      runNew();
    }
  },
};
