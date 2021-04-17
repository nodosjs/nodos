import path from 'path';
import extension from '../../../index.js';


export default (app) => {
  app.addExtension(extension);
  app.config.db = {
    type: 'sqlite',
    database: path.join(__dirname, '../db/test.sqlite3'),
  };
};
