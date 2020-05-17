const yargs = require('yargs');
const yeoman = require('yeoman-environment');

module.exports = async () => {
  const env = yeoman.createEnv();

  env.register(require.resolve('./generators/Newapp.js'), 'newapp');

  const commands = {
    new: {
      command: 'new <appPath>',
      builder: (command) => {
        command.positional('appPath', {
          describe: 'Path to the application',
        });
      },
      handler: (argv) => {
        env.run(`newapp ${argv.appPath}`);
      },
    },
  };

  const help = `
The 'nodos new' command creates a new Nodos application with a default
directory structure and configuration at the path you specify.
`;

  const example = `
nodos new ~/Code/Node/weblog

This generates a skeletal Nodos installation in ~/Code/Nodos/weblog.
`;

  const parser = yargs
    .demandCommand()
    .recommendCommands()
    .strict()
    .showHelpOnFail(true)
    .command(commands.new)
    .option('verbose', {
      alias: 'v',
      default: false,
    })
    .epilog(help.trim())
    .example(example.trim());
  await parser.argv;
};
