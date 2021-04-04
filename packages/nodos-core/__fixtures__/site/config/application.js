const Inflector = require('inflected');

export default async (app) => {
  Inflector.inflections('en', (inflect) => {
    inflect.irregular('person', 'people');
  });
};
