// @ts-check

import { Model } from 'objection';
import Password from 'objection-password';

export default class User extends Password()(Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  get isGuest() {
    return false;
  }
}
