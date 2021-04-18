const parser = require('yargs');
const { runner } = require('hygen');
const Logger = require('hygen/dist/logger.js').default;
const path = require('path');
const enquirer = require('enquirer');
const execa = require('execa');
const { version } = require('../../package.json');
const log = require('../logger.js');
// const fse = require('fs-extra');

const defaultTemplates = path.join(__dirname, 'templates');

module.exports = async (dir, options = {}) => {
  const {
    args = process.argv.slice(2),
    env = {},
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
      command.option('--skip-install', {
        default: false,
        describe: 'skip npm install',
        type: 'boolean',
      });
      command.option('--without', {
        default: false,
        describe: 'generate new app without packages',
        type: 'array',
      });
    },
    handler: async (params) => {
      log(params);
      const { appPath, skipInstall, without } = params;
      // TODO: pass version directly, without arguments
      const fullPath = path.resolve(dir, appPath);
      const basename = path.basename(fullPath);
      const dirname = path.dirname(fullPath);

      console.log('> genearte file structure');
      const result = await runner(['generate', 'new', basename, '--version', version, '--without', without], {
        templates: defaultTemplates,
        cwd: dirname,
        logger: new Logger(console.log.bind(console)),
        createPrompter: () => enquirer,
        // exec: async (action, body) => {
        //   const opts = body && body.length > 0 ? { input: body } : {};
        //   await execa.shell(action, opts);
        // },
        debug: !!process.env.DEBUG,
      });

      if (result.success && !skipInstall) {
        const execaOptions = {
          env, cwd: fullPath, all: true, buffer: false, shell: true,
        };
        log(execaOptions);
        console.log('> npm install');
        const subprocess = execa.command('npm install', execaOptions);
        subprocess.stdout.pipe(process.stdout);
        subprocess.stderr.pipe(process.stderr);
        await subprocess;
      }
    },
  });

  return parser.parse(args);
};
