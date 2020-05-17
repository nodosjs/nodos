const path = require('path');
const yargs = require('yargs');
const yeoman = require('yeoman-environment');
const log = require('./logger.js');

module.exports = async (options = {}) => {
  const {
    args = process.argv.slice(2),
    exitProcess = true,
  } = options;

  const env = yeoman.createEnv();

  env.register(require.resolve('./generators/Newapp.js'), 'newapp');

  const commands = {
    new: {
      command: 'new <appPath>',
      builder: (command) => {
        command.positional('appPath', {
          type: 'string',
          describe: 'Project Root Directory',
        });
      },
      handler: ({ appPath }) => {
        log('APP_PATH', appPath);
        env.run(`newapp ${appPath}`);
      },
    },
  };

  const help = `
The 'nodos new' command creates a new Nodos application with a default
directory structure and configuration at the path you specify.
`;

  const example = `
nodos new projects/myBlog

This generates a skeletal Nodos installation in ./projects/myBlog
`;

  const parser = yargs(args);
  parser.exitProcess(exitProcess)
  // .recommendCommands()
    .strict()
    .showHelpOnFail(true)
    .command(commands.new)
  // .option('verbose', {
  //   alias: 'v',
  //   default: false,
  // })
    .demandCommand()
    .example(example.trim())
    .epilog(help.trim())
    .help();
  await parser.argv;
};
