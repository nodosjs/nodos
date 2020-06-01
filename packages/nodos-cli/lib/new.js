const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const path = require('path');

const defaultTemplates = path.join(__dirname, 'templates');

module.exports = async (options = {}) => {
  const { args = process.argv.slice(2) } = options;
  const [command, appName, dir] = args;
  const cwd = dir || process.cwd();

  await runner(['generate', command, appName], {
    templates: defaultTemplates,
    cwd,
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => require('enquirer'),
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return require('execa').shell(action, opts)
    },
    debug: !!process.env.DEBUG,
  });
};
