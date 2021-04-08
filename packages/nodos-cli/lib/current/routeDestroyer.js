const path = require('path');
const fsp = require('fs/promises');
const yaml = require('js-yaml');
const _ = require('lodash');
const Logger = require('hygen/dist/logger').default;

const log = new Logger(console.log.bind(console));

const destroyRoute = async (workdir, resourceName, scopeName = '/') => {
  const routesPath = path.join(workdir, 'config/routes.yml');
  const currentYaml = await fsp.readFile(routesPath, 'utf8');
  const data = yaml.load(currentYaml);

  if (!data.scopes) {
    throw new Error('No scopes in routes.js');
  }
  const scope = data.scopes.find((s) => s.name === scopeName);
  if (!scope) {
    throw new Error(`Scope '${scopeName} does not exists`);
  }

  if (!scope.routes) {
    scope.routes = [];
  }
  const removedResourse = _.remove(scope.routes, ({ resources }) => resources === resourceName);
  const isDestroyRoute = !_.isEmpty(removedResourse);

  const mapper = ([key, value]) => {
    const dumped = yaml.dump(value).trim();
    const padded = dumped.split('\n').map((line) => `  ${line}`).join('\n');
    return `${key}:\n${padded}`;
  };
  const blocks = [
    '---',
    ...Object.entries(data).map(mapper),
  ];
  const newYaml = blocks.join('\n\n');

  await fsp.writeFile(routesPath, newYaml);

  if (isDestroyRoute) {
    log.warn('       edited:  ./config/routes.yml');
  }

  return { newYaml, isDestroyRoute };
};

module.exports = destroyRoute;
