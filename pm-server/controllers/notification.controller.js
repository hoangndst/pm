import database from "../models/data/index.js"

export const getNotifications = async (req, res) => {
  const userId = req.query.userId
  try {
    const notifications = await database.notification.findAll({
      where: {
        to_user_id: userId
      },
      attributes: ["id", "type", "route", "is_read", "to_user_id", "from_user_id", "notification_content", "createdAt", "updatedAt"],
      order: [["updatedAt", "DESC"]]
    })

    try {
      const fromUsers = await database.user.findAll({
        where: {
          id: notifications.map(notification => notification.from_user_id)
        },
        attributes: ["id", "username", "first_name", "last_name"]
      })
      const notificationsWithFromUsers = notifications.map(notification => {
        const fromUser = fromUsers.find(fromUser => fromUser.id === notification.from_user_id)
        return {
          ...notification.dataValues,
          from_user: fromUser
        }
      })
      res.status(200).send(notificationsWithFromUsers)
    } catch (error) {
      res.status(500).send({
        message: error.message
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

export const updateNotification = async (req, res) => {
  const notificationId = req.params.id
  try {
    const notification = await database.notification.findOne({
      where: {
        id: notificationId
      }
    })
    if (notification) {
      notification.is_read = true
      await notification.save()
      res.status(200).send(notification)
    } else {
      res.status(404).send({
        message: "Notification not found"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

export const updateNotificationByRoute = async (req, res) => {
  const route = req.body.route
  const userId = req.body.userId
  try {
    const notifications = await database.notification.findAll({
      where: {
        route: route,
        to_user_id: userId
      }
    })
    if (notifications) {
      notifications.forEach(async notification => {
        notification.is_read = true
        await notification.save()
      })
      res.status(200).send(notifications)
    } else {
      res.status(404).send({
        message: "Notification not found"
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

export const createNotification = async (notification) => {
  try {
    const checkNotificationExist = await database.notification.findOne({
      where: {
        to_user_id: notification.to_user_id,
        from_user_id: notification.from_user_id,
        type: notification.type,
        route: notification.route
      }
    })
    if (!checkNotificationExist) {
      const newNotification = await database.notification.create(notification)
      return newNotification
    } else {
      checkNotificationExist.is_read = false
      await checkNotificationExist.save()
      return checkNotificationExist
    }
  } catch (error) {
    console.log(error)
  }
}