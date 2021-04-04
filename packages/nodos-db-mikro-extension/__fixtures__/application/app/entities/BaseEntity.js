// @ts-check

const { Collection, ReferenceType, EntitySchema, wrap } = require('@mikro-orm/core');

/**
 * @property {ObjectID} _id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
class BaseEntity {

  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    const props = wrap(this).__meta.properties;

    Object.keys(props).forEach(prop => {
      if ([ReferenceType.ONE_TO_MANY, ReferenceType.MANY_TO_MANY].includes(props[prop].reference)) {
        this[prop] = new Collection(this);
      }
    });
  }

}

const schema = new EntitySchema({
  name: 'BaseEntity',
  properties: {
    _id: { primary: true, type: 'ObjectID' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date', onUpdate: () => new Date() },
  },
});

module.exports.BaseEntity = BaseEntity;
module.exports.entity = BaseEntity;
module.exports.schema = schema;
