---
to: './<%= name %>/config/webpack/common.js'
---
const path = require('path');

module.exports = {
  entry: [
    path.resolve(__dirname, '../../app/assets/stylesheets/application.scss'),
    path.resolve(__dirname, '../..//app/javascript/application.js'),
  ],
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, '../../public/assets'),
  },
};
