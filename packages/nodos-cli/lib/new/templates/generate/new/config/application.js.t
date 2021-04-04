---
to: './<%= name %>/config/application.js'
---

/* @ts-check */

import nodosDb from '@nodosjs/db-typeorm-extension';
import nodosView from '@nodosjs/view-extension';
import Inflector from 'inflected';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);

  app.config.csrf = { enabled: true };

  Inflector.inflections('en', (inflect) => {
    inflect.irregular('person', 'people');
  });
};
