/* eslint-disable no-param-reassign */

export default (config) => {
  config.log_level = 'debug';
  config.extensions.push(
    import('@nodosjs/db'),
  );
  config.plugins.push(
    import('fastify-cookie'),
    import('fastify-formbody'),
  );
};
