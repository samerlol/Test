const Sequelize = require("sequelize");
require("dotenv").config();

const DB_name = process.env.DB_name;
const DB_username = process.env.DB_username;
const DB_password = process.env.DB_password;
const DB_hostname = process.env.DB_host;
const DB_dialect = process.env.DB_dialect;

const sequelize = new Sequelize(DB_name, DB_username, DB_password, {
  host: DB_hostname,
  dialect: DB_dialect,
  operatorsAliases: false,
});

async () => await sequelize.sync().then(() => {});

module.exports = sequelize;
global.sequelize = sequelize;
