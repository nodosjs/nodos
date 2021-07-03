// @ts-check

const _ = require('lodash');

// eslint-disable-next-line import/prefer-default-export
const getOrError = (obj, key) => {
  if (!_.has(obj, key)) {
    throw new Error(`Key '${key}' not found`);
  }
  return obj[key];
};

module.exports = {
  getOrError,
};
