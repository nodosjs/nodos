const del = require('del');
const _ = require('lodash');
const Inflector = require('inflected');
const Logger = require('hygen/dist/logger').default;
const destroyRoute = require('./routeDestroyer.js');

const log = new Logger(console.log.bind(console));
const workdir = process.cwd();

const controllerHandler = async (name) => {
  const paths = [
    `*/templates/${Inflector.pluralize(name)}`,
    `*/controllers/${Inflector.pluralize(name)}.js`,
  ];

  const deletedPaths = await del(paths, { cwd: workdir, onlyFiles: false });

  if (_.isEmpty(deletedPaths)) {
    log.warn(`       You don't have controller ${Inflector.pluralize(name)}!`);
  }

  deletedPaths.forEach((path) => log.err(`       removed: ${path.replace(process.cwd(), '.')}`));
};

const modelHandler = () => {};

const resourcesHandler = async ({ name, type }) => {
  const paths = [
    `*/templates/${Inflector.pluralize(name)}`,
    `*/controllers/${Inflector.pluralize(name)}.js`,
  ];

  const deletedPaths = await del(paths, { cwd: workdir, onlyFiles: false });
  const { isDestroyRoute } = await destroyRoute(workdir, type, Inflector.pluralize(name));

  if (_.isEmpty(deletedPaths) && !isDestroyRoute) {
    log.warn(`       You don't have resourse ${Inflector.pluralize(name)}!`);
  }

  deletedPaths.forEach((path) => log.err(`       removed: ${path.replace(process.cwd(), '.')}`));
};

const resourceHandler = async ({ name, type }) => {
  const paths = [
    `*/templates/${Inflector.singularize(name)}`,
    `*/controllers/${Inflector.singularize(name)}.js`,
  ];

  const deletedPaths = await del(paths, { cwd: workdir, onlyFiles: false });
  const { isDestroyRoute } = await destroyRoute(workdir, type, Inflector.singularize(name));

  if (_.isEmpty(deletedPaths) && !isDestroyRoute) {
    log.warn(`       You don't have resourse ${Inflector.singularize(name)}!`);
  }

  deletedPaths.forEach((path) => log.err(`       removed: ${path.replace(process.cwd(), '.')}`));
};

module.exports = [
  { type: 'controller', handler: controllerHandler },
  { type: 'model', handler: modelHandler },
  { type: 'resources', handler: resourcesHandler },
  { type: 'resource', handler: resourceHandler },
];
