// import 'reflect-metadata';
// import sqlite from 'sqlite3';
import { createConnection } from 'typeorm';
import User from '../entities/User';

const getConnection = () => createConnection({
  type: 'postgres',
  username: 'postgres',
  password: 'password',
  database: 'example',
  host: 'db',
  synchronize: true,
  logging: true,
  // entities: [
  //   '../entities/**/*.js',
  // ],
  entities: [
    User,
  ],
  migrations: [
    '../../db/migrations/**/*.js',
  ],
});

export const index = async (request, response) => {
  const connection = await getConnection();
  const users = await connection
    .getRepository(User)
    .find();

  response.render({ users });
};

export const build = (request, response) => {
};

export const edit = (request, response) => {
};

export const show = async (request, response) => {
  const connection = await getConnection();
  const user = await connection
    .getRepository(User)
    .findOne(request.params.id);
  if (!user) {
    response.head(404);
  }

  response.render({ user });
};

export const create = async (request, response) => {
  const connection = await getConnection();
  const user = new User(request.body.user);

  if (user instanceof Object) { // validation
    await connection
      .manager
      .save(user);
    response.redirectTo('/users');
    return;
  }

  response.render({ user }, 'build');
};

export const destroy = (request, response) => {
  const { id: userId } = request.params;
  if (userId) { // validation
  }

  response.redirectTo('/users');
};
