import { EntitySchema } from 'typeorm';

import Post from './Post.js';

export default new EntitySchema({
  name: 'posts',
  target: Post,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    body: {
      type: 'text',
    }
  }
});
