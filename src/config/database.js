import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

dotenv.config();

console.log('ENV TEST:', {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

const rawPort = Number.parseInt(process.env.MYSQL_PORT ?? '3306', 10);

export const sequelize = new Sequelize(
  process.env.MYSQL_DB ?? '',
  process.env.MYSQL_USER ?? '',
  process.env.MYSQL_PASSWORD ?? '',
  {
    host: process.env.MYSQL_HOST ?? 'localhost',
    port: Number.isNaN(rawPort) ? 3306 : rawPort,
    dialect: 'mysql',
    logging: false,
  },
);
