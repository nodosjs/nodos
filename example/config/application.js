import nodosDb from '@nodosjs/db-typeorm-extension';
import nodosView from '@nodosjs/view-extension';
import { inflections } from 'inflected';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);

  inflections('en', (inflect) => {
    inflect.irregular('person', 'people');
  });
};
