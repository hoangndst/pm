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
    assigned_to: {
      type: Sequelize.STRING,
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    created_by: {
      type: Sequelize.STRING
    },
    completed_on: {
      type: Sequelize.DATE,
      allowNull: true
    }
  })
  return Task
}
export default taskModel