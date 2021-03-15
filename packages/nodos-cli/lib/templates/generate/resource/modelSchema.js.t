---
to: "./app/entities/<%= h.changeCase.upperCaseFirst(name) %>Schema.js"
---

import { EntitySchema } from 'typeorm';

import <%= h.changeCase.upperCaseFirst(name) %> from './<%= h.changeCase.upperCaseFirst(name) %>.js';

export default new EntitySchema({
  name: '<%= h.inflection.pluralize(name) %>',
  target: <%= h.changeCase.upperCaseFirst(name) %>,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    firstName: {
      type: 'varchar',
    }
  }
});
