const { Command, flags } = require('@oclif/command');
const yeoman = require('yeoman-environment');
// const generator = require('');

const env = yeoman.createEnv();

env.register(require.resolve('../app'), 'newapp');

const description = `
The 'nodos new' command creates a new Nodos application with a default
directory structure and configuration at the path you specify.

...

Example:
    nodos new ~/Code/Node/weblog

    This generates a skeletal Nodos installation in ~/Code/Nodos/weblog.
`;

export default class NewCommand extends Command {
  static flags = {
    name: flags.string({ char: 'n', description: 'name to print' }),
  };

  static args = [
    { name: 'APP_PATH' },
  ]

  static description = description

  async run() {
    // FIXME: add http://yeoman.io/authoring/integrating-yeoman.html
    env.run('newapp');
    const opt = this.parse(NewCommand);
    const name = opt.flags.name || 'world';
    this.log(`hello ${name} from ./src/commands/hello.js`);
  }
}
