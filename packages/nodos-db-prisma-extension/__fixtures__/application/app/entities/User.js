// @ts-check

const { BaseEntity } = require('./BaseEntity.js');
const { EntitySchema } = require('@mikro-orm/core');

class User extends BaseEntity {

  /**
   * @param {string} firstName
   * @param {string} email
   */
  constructor(firstName, email) {
    super();
    this.firstName = firstName;
    this.email = email;
  }
}

const schema = new EntitySchema({
  class: User,
  extends: 'BaseEntity',
  properties: {
    firstName: { type: 'string' },
    email: { type: 'string' },
  },
});

module.exports = {
  User,
  schema,
  entity: User,
};
