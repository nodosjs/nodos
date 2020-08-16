import { Model } from 'objection';
import crypto from 'crypto';

export default class User extends Model {
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

  set password(value) {
    this.passwordDigest = crypto.createHash('sha256')
      .update(value)
      .digest('hex');
  }

  get isGuest() {
    return false;
  }
}
