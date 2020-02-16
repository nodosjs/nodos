import hmr from 'fastify-webpack-hmr';
import webpack from 'webpack';

import Application from '../Application';
import webpackConfig from '../../webpack.config';

const compiler = webpack(webpackConfig);

export default class Development extends Application {
  init() {
    super.init();
    this.addPlugin(hmr, { compiler });
    this.config.logLevel = 'debug';
    this.config.cacheModules = true;
    this.config.db = {
      type: 'sqljs',
      synchronize: true,
      logging: true,
      // database: 'db/development.sqlite3',
      entities: [
        `${__dirname}/../../app/entities/*.js`,
      ],
    };
  }
}
