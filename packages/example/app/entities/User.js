import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id = null;

  @Column('varchar')
  name = '';

  constructor(attrs = {}) {
    this.name = attrs.name;
  }
}
