---
to: './<%= name %>/config/webpack/common.js'
---
import path from 'path';

export default ({
  context: path.resolve(__dirname, '../..'),
  entry: [
    './app/assets/stylesheets/application.scss',
    './app/javascript/application.js',
  ],
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, '../../public/assets'),
  },
});
