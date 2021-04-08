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

const resourceHandler = async (name) => {
  const paths = [
    `*/templates/${Inflector.pluralize(name)}`,
    `*/controllers/${Inflector.pluralize(name)}.js`,
    `*/entities/${Inflector.classify(name)}.js`,
    `*/entities/${Inflector.classify(name)}Schema.js`,
  ];

  const deletedPaths = await del(paths, { cwd: workdir, onlyFiles: false });
  const { isDestroyRoute } = await destroyRoute(workdir, Inflector.pluralize(name));

  if (_.isEmpty(deletedPaths) && !isDestroyRoute) {
    log.warn(`       You don't have resourse ${Inflector.pluralize(name)}!`);
  }

  deletedPaths.forEach((path) => log.err(`       removed: ${path.replace(process.cwd(), '.')}`));
};

module.exports = [
  { type: 'controller', handler: controllerHandler },
  { type: 'model', handler: modelHandler },
  { type: 'resource', handler: resourceHandler },
];
