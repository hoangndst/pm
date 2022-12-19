import authJWT from "../middleware/authJWT.js"
import { getNotifications, updateNotification, updateNotificationByRoute } from "../controllers/notification.controller.js"

const notificationRoutes = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.get("/pm/get-notifications-by-userid", [authJWT.verifyToken], getNotifications)
  app.put("/pm/update-notification/:id", [authJWT.verifyToken], updateNotification)
  app.put("/pm/update-notification-by-route", [authJWT.verifyToken], updateNotificationByRoute)
}
export default notificationRoutes;