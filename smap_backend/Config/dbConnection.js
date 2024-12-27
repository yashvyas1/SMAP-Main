import pkg from "pg";
const { Client } = pkg;
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DBNAME;

const sequelize = new Sequelize(dbName, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: "postgres",
  logging: false
});

const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: 5432,
  password: process.env.PASSWORD,
});
 
export { sequelize, dbName, client };