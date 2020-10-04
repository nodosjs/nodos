import nodosDb from '@nodosjs/db-extension';
import nodosWebpack from '@nodosjs/webpack-extension';
import nodosView from '@nodosjs/view-extension';

export default async (app) => {
  app.addExtension(nodosDb);
  app.addExtension(nodosWebpack);
  app.addExtension(nodosView);
};
