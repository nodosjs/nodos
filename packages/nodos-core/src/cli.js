import _ from 'lodash';
import yargs from 'yargs';
import { nodos } from '.';
import log from './logger';

export default async (args = process.argv.slice(2), options = {}) => {
  const {
    exitProcess = true,
    projectRoot = process.cwd(),
    container = {},
    done = _.noop, // FIXME: hack for testing purposes
  } = options;
  const parser = yargs(args);
  parser.exitProcess(exitProcess);
  // parser.fail(done.fail);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  const nodosItem = _.get(container, 'nodos', nodos);
  const app = await nodosItem(projectRoot);
  // .epilog(help.trim())
  // .example(example.trim())
  // console.log(app);
  // console.log(app.commandBuilders);
  const commands = app.commandBuilders.map(build => build({ app, container, done }));
  console.log(commands);
  commands.forEach(c => parser.command(c));
  return parser.argv;
};
