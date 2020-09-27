const Sequelize = require("sequelize");
require("../src/database/connection");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users", // Model name
    {
      id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      type: Sequelize.DataTypes.ENUM(["NORMAL", "ADMIN"]),
    }
  );

 //Define Association.
  User.associate = (models) => {
    models.UserProfile.belongsTo(User, { onDelete: "cascade", hooks: true });
    User.hasOne(models.UserProfile, { onDelete: "cascade", hooks: true });
  };
  
  return User;
};
