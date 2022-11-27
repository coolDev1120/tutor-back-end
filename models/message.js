module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    message_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
    },
    emailTo: {
      type: Sequelize.STRING,
    },
    message: {
      type: Sequelize.STRING,
    },
  });

  return Message;
};
