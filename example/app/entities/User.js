// @ts-check

const { Entity, PrimaryKey, Property } = require('@mikro-orm/core');

@Entity()
export class User {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  email!: string;
}
