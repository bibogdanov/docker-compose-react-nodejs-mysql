module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    due_date: {
      type: Sequelize.DATE
    },
    state: {
      type: Sequelize.STRING
    }
  });

  return Task;
};
