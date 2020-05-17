const runCurrent = require('./lib/current.js');
const runNew = require('./lib/new.js');

module.exports = async (projectRoot, args = process.argv.slice(2), options = {}) => {
  // if inside nodos project
  if (true) {
    runCurrent(projectRoot);
  } else {
    runNew();
  }
};
