const knex = require('knex');
const { runner } = require('hygen');
const Logger = require('hygen/lib/logger');
const enquirer = require('enquirer');
const execa = require('execa');
const path = require('path');


const migrationHandler = async ({ app, name }) => {
  const knexClient = knex(app.container.db.config);

  await knexClient.migrate.make(name);
  await knexClient.destroy();
};

const modelHandler = ({ name }) => {
  const defaultTemplates = path.join(__dirname, 'templates');
  const command = ['generate', 'model', name].join(' ');

  runner(command, {
    templates: defaultTemplates,
    cwd: process.cwd(),
    logger: new Logger(console.log.bind(console)),
    createPrompter: () => enquirer,
    exec: (action, body) => {
      const opts = body && body.length > 0 ? { input: body } : {};
      return execa.shell(action, opts);
    },
    debug: !!process.env.DEBUG,
  });
};

module.exports = [
  {
    type: 'migration',
    handler: migrationHandler,
  },
  {
    type: 'model',
    handler: modelHandler,
  },
];
