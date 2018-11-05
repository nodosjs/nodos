import _ from 'lodash';
// import 'reflect-metadata';
import { promises as fs } from 'fs';
import sqlite3 from 'sqlite3';
import { createConnection } from 'typeorm';
import yaml from 'js-yaml';
import User from '../entities/User';

const getConnection = async () => {
  const rawData = await fs.readFile(`${__dirname}/../../config/database.yml`);
  const dbConfigs = yaml.safeLoad(rawData);
  const baseConfig = {
    host: 'localhost',
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
  };
  return createConnection(_.merge(baseConfig, dbConfigs[process.env.NODOS_ENV]));
};

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
