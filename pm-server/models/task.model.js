const taskModel = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    task_name: {
      type: Sequelize.STRING
    },
    task_description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    creator_id: {
      type: Sequelize.STRING
    },
    completedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  })
  return Task
}
export default taskModel