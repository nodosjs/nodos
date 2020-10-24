import nodosDb from '@nodosjs/db-extension';
import nodosView from '@nodosjs/view-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosView);
};
