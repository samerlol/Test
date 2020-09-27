module.exports = (sequelize, Sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    "userProfile", // Model name
    {
      user: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
        unique: true,
      },
      display_name: {
        type: Sequelize.DataTypes.STRING(35),
        allowNull: false,
      },
      email: { type: Sequelize.DataTypes.STRING, allowNull: true },
    },
    { tableName: "userProfile", freezeTableName: true }
  );

  //Removing id Attribute.
  UserProfile.removeAttribute("id");

  (async () => {
    await sequelize.sync();
  })();

  return UserProfile;
};
