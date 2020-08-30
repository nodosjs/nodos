---
to: './<%= name %>/config/webpack/development.js'
---
import { merge } from 'webpack-merge';
import common from './common.js';

export default merge(common, {
  mode: 'development',
})
