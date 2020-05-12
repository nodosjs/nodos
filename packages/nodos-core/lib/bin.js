const _ = require('lodash');
const yargs = require('yargs');
const log = require('./logger');
const nodos = require('./nodos');

module.exports = async (projectRoot, args = process.argv.slice(2), options = {}) => {
  const {
    // exitProcess = true,
    container = {},
    // done = _.noop, // FIXME: hack for testing purposes
  } = options;
  const parser = yargs(args);
  parser.exitProcess(false);
  // parser.fail(console.log);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  const nodosItem = _.get(container, 'nodos', nodos);
  const app = await nodosItem(projectRoot);
  await app.start();
  // .epilog(help.trim())
  // .example(example.trim())
  // console.log(app);
  // console.log(app.commandBuilders);
  const commands = app.commands.map((build) => build({ app, container }));
  log(commands);
  commands.forEach(c => parser.command(c));
  await parser.argv;
  return app;
};
