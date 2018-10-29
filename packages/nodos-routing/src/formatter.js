import _ from 'lodash';
import columnify from 'columnify';

// eslint-disable-next-line import/prefer-default-export
export const formatRoutesForConsole = routes => columnify(
  routes,
  {
    columns: ['method', 'url', 'middlewares'],
    config: {
      method: {
        headingTransform: () => 'Verb',
        dataTransform: _.toUpper,
      },
      url: {
        headingTransform: () => 'URI Pattern',
      },
      middlewares: {
        headingTransform: () => 'Middlewares',
        dataTransform: names => `[ ${names} ]`,
      },
    },
  },
);
