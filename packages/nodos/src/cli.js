import _ from 'lodash';
import yargs from 'yargs';
import commandsBuilder from './commands';

export default (args = process.argv.slice(2), options = {}) => {
  const { exitProcess = true, container = {}, done = _.noop } = options;
  const commands = commandsBuilder(container, done);
  const parser = yargs(args);
  parser.exitProcess(exitProcess);
  // parser.fail(done.fail);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  parser.option('projectRoot', {
    alias: 'r',
    default: process.cwd(),
  });
  // .epilog(help.trim())
  // .example(example.trim())
  commands.forEach(command => parser.command(command));
  return parser.argv;
};
