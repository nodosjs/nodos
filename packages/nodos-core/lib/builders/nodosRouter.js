// @ts-check

const yml = require('js-yaml');
// const debug = require('debug');
const { promises: fs } = require('fs');
const Router = require('@nodosjs/routing');

// const log = debug('nodos');

module.exports = async (routesPath, { host }) => {
  const rawData = await fs.readFile(routesPath, 'utf-8');
  const routesMap = yml.load(rawData);
  return new Router(routesMap, { host });
};
