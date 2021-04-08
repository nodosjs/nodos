// const _ = require('lodash');
const parser = require('yargs');
const commandBuilders = require('./commands.js');
const log = require('../logger.js');
const generators = require('./generators.js');
const destroyers = require('./destroyers.js');
// const log = require('./logger');

module.exports = async (app, options = {}) => {
  const {
    args = process.argv.slice(2),
    exitProcess = true,
    container = {},
  } = options;
  parser.exitProcess(exitProcess);
  // parser.fail(console.log);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  // await app.start();
  // .epilog(help.trim())
  // .example(example.trim())
  // console.log(app);

  Object.values(commandBuilders).forEach((build) => app.addCommandBuilder(build));
  generators.forEach((generator) => app.addGenerator(generator));
  destroyers.forEach((destroyer) => app.addDestroyer(destroyer));
  await app.initApp();
  const commands = app.commandBuilders.map((build) => build({ app, container }));
  log(commands);
  commands.forEach((c) => parser.command(c));

  await parser.parse(args);
};
