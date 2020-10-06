import { Model } from 'objection';
import Password from 'objection-password';

export default class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema() {
      return {
        type: 'object',
        required: ['title', 'text'],
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          text: { type: 'text', minLength: 50 },
        },
      };
    }

  get isGuest() {
    return false;
  }
}
