// @ts-check

const _ = require('lodash');

const requireDefaultFunction = (path) => {
  const v = require(path); // eslint-disable-line
  const f = _.isObject(v) ? v.default : v;
  if (!_.isFunction(f)) {
    throw new Error(`There is no default function in the '${path}'`);
  }

  return f;
};

module.exports = {
  requireDefaultFunction,
};
