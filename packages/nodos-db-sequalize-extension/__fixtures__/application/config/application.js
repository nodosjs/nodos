// import path from 'path';
import extension from '../../../index.js';


export default (app) => {
  app.addExtension(extension);

  app.config.db = {
    databaseUrl: 'sqlite::memory:',
  };
};
