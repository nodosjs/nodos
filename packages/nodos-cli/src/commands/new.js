const { Command, flags } = require('@oclif/command');

const description = `
The 'nodos new' command creates a new Rails application with a default
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
    const opt = this.parse(NewCommand);
    const name = opt.flags.name || 'world';
    this.log(`hello ${name} from ./src/commands/hello.js`);
  }
}
