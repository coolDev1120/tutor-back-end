module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    agent: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    schedule: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
