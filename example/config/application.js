import nodosDb from '@nodosjs/db-typeorm-extension';
import nodosView from '@nodosjs/view-extension';
// import Inflector from 'inflected';
// TODO: switch to import
const Inflector = require('inflected');

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);

  Inflector.inflections('en', (inflect) => {
    inflect.irregular('person', 'people');
  });
};
