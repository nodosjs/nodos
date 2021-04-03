---
to: "./app/entities/<%= h.inflection.capitalize(name) %>.js"
---
import { Model } from 'objection';

export default class <%= h.inflection.capitalize(name) %> extends Model {
  static get tableName() {
    return '<%= h.inflection.pluralize(name) %>';
  }
}
