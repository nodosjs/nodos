// @ts-check

const yml = require('js-yaml');
// const debug = require('debug');
const fsp = require('fs/promises');
const Router = require('@nodosjs/routing');

// const log = debug('nodos');

module.exports = async (routesPath, { host }) => {
  const rawData = await fsp.readFile(routesPath, 'utf-8');
  const routesMap = yml.load(rawData);
  return new Router(routesMap, { host });
};
