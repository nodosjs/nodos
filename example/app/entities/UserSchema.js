import { EntitySchema } from 'typeorm';

import User from './User.js';

export default new EntitySchema({
  name: 'users',
  target: User,
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
