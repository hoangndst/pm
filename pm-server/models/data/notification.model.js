const notificationModel = (sequelize, Sequelize) => {
  const Notification = sequelize.define('notification', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    is_read: {
      type: Sequelize.BOOLEAN
    },
    from_user_id: {
      type: Sequelize.STRING
    }
  })
  return Notification
}

export default notificationModel