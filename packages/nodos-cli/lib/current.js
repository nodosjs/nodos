// const _ = require('lodash');
const yargs = require('yargs');
const commandBuilders = require('./commands.js');
const log = require('./logger.js');
// const log = require('./logger');

module.exports = async (app, options = {}) => {
  const {
    args = process.argv.slice(2),
    exitProcess = true,
    container = {},
    // done = _.noop, // FIXME: hack for testing purposes
  } = options;
  const parser = yargs(args);
  parser.exitProcess(exitProcess);
  // parser.fail(console.log);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  await app.start();
  // .epilog(help.trim())
  // .example(example.trim())
  // console.log(app);
  // console.log(app.commandBuilders);
  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  const commands = app.commandBuilders.map((build) => build({ app, container }));
  log(commands);
  commands.forEach((c) => parser.command(c));
  await parser.argv;
};
