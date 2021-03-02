const parser = require('yargs');
const { runner } = require('hygen');
const Logger = require('hygen/dist/logger.js').default;
const path = require('path');
const enquirer = require('enquirer');
const execa = require('execa');
const { version } = require('../package.json');
const fse = require('fs-extra');

const defaultTemplates = path.join(__dirname, 'templates');

module.exports = async (dir, options = {}) => {
  const {
    args = process.argv.slice(2),
    exitProcess = true,
  } = options;
  parser.exitProcess(exitProcess);
  // parser.fail(console.log);
  parser.demandCommand();
  parser.recommendCommands();
  parser.strict();
  parser.showHelpOnFail(true);
  parser.command({
    command: 'new <appName>',
    describe: 'Create new Nodos application',
    builder: (command) => {
      command.positional('appName', {
        describe: 'The Application Name',
      });
    },
    handler: async ({ appName }) => {
      // TODO: pass version directly, without arguments
      await runner(['generate', 'new', appName, '--version', version], {
        templates: defaultTemplates,
        cwd: dir,
        logger: new Logger(console.log.bind(console)),
        createPrompter: () => enquirer,
        exec: (action, body) => {
          const opts = body && body.length > 0 ? { input: body } : {};
          return execa.shell(action, opts);
        },
        debug: !!process.env.DEBUG,
      });
    },
  });

  return parser.parse(args);
};
