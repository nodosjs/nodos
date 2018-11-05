/* eslint-disable no-param-reassign */

export default (config) => {
  config.extensions.push(
    import('@nodosjs/db'),
  );
  config.plugins.push(
    import('fastify-cookie'),
    import('fastify-formbody'),
  );
  config.db = {
    type: 'sqlite',
    synchronize: true,
    logging: true,
    database: 'db/test.sqlite3',
    entities: [
      `${__dirname}/../app/entities/*.js`,
    ],
  };
};
