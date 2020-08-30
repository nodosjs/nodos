import { merge } from 'webpack-merge';
import common from './common.js';

export default merge(common, {
  mode: 'production'
});
