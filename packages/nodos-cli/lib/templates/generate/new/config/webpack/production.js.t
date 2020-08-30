---
to: './<%= name %>/config/webpack/production.js'
---
const { merge } = require('webpack-merge');
const common = require('./common.js');

module.exports = merge(common, {
  mode: 'production'
});
