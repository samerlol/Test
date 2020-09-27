require("dotenv").config();

const DB_Name = process.env.DB_name;
const DB_Host = process.env.DB_host;
const DB_Username = process.env.DB_username;
const DB_Password = process.env.DB_password;
const DB_Dialect = process.env.DB_dialect;

const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(DB_Name, DB_Username, DB_Password, {
  host: DB_Host,
  dialect: DB_Dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./User")(sequelize, Sequelize, DataTypes);
db.userProfile = require("./UserProfile")(sequelize, Sequelize, DataTypes);

//Define Association.
db.userProfile.belongsTo(db.user, { foreignKey: "user", onDelete: "cascade" });
db.user.hasOne(db.userProfile, { foreignKey: "user", onDelete: "cascade" });

module.exports = db;
