module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Blog",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "blogs",
      schema: "public",
      timestamps: false,
    }
  );
};
