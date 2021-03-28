const parser = require('yargs');
const { runner } = require('hygen');
const Logger = require('hygen/dist/logger.js').default;
const path = require('path');
const enquirer = require('enquirer');
const execa = require('execa');
const { version } = require('../../package.json');
// const fse = require('fs-extra');

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
    command: 'new <appPath>',
    describe: 'Create new Nodos application',
    builder: (command) => {
      command.positional('appPath', {
        describe: 'Base directory for the application. Type . for current one',
      });
    },
    handler: async ({ appPath }) => {
      // TODO: pass version directly, without arguments
      const fullPath = path.resolve(dir, appPath);
      const basename = path.basename(fullPath);
      const dirname = path.dirname(fullPath);
      console.log('!!!', fullPath);
      await runner(['generate', 'new', basename, '--version', version], {
        templates: defaultTemplates,
        cwd: dirname,
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
