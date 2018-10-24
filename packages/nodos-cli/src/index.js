const { Command, flags } = require('@oclif/command');

class NodosCliCommand extends Command {
  async run() {
    const opt = this.parse(NodosCliCommand);
    const name = opt.flags.name || 'world';
    this.log(`hello ${name} from ./src/index.js`);
  }
}

NodosCliCommand.description = `Describe the command here
...
Extra documentation goes here
`;

NodosCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: 'v' }),
  // add --help flag to show CLI version
  help: flags.help({ char: 'h' }),
  name: flags.string({ char: 'n', description: 'name to print' }),
};

module.exports = NodosCliCommand;
