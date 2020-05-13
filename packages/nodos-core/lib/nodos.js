const _ = require('lodash');
const path = require('path');
const localCommands = require('./commands');
const log = require('./logger');
const Application = require('./Application.js');


module.exports = async (projectRoot, env = process.env.NODE_ENV || 'development') => {
  log('PROJECT_ROOT', projectRoot);

  const app = new Application(projectRoot, env);
  Object.values(localCommands).forEach((command) => app.addCommand(command));

  return app;
};
