const path = require('path');
const fsp = require('fs/promises');
const yaml = require('js-yaml');

const generateNewRoute = async (workdir, resourceType, resourceName, scopeName = '/') => {
  const routesPath = path.join(workdir, 'config/routes.yml');
  const currentYaml = await fsp.readFile(routesPath, 'utf8');
  const data = yaml.load(currentYaml);
  if (!data.scopes) {
    throw new Error('No scopes in routes.js');
  }
  const scope = data.scopes.find((s) => s.path === scopeName);
  if (!scope) {
    throw new Error(`Scope '${scopeName} does not exists`);
  }
  if (!scope.routes) {
    scope.routes = [];
  }
  scope.routes.push({ [resourceType]: resourceName });

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
  // console.log(newYaml);
  await fsp.writeFile(routesPath, newYaml);
  return newYaml;
};

module.exports = generateNewRoute;
