const yargs = require('yargs');
const yeoman = require('yeoman-environment');
const env = yeoman.createEnv();

env.register(require.resolve('./tasks.js'), 'generate');

module.exports = env;

