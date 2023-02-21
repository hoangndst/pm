import jwt from "jsonwebtoken"
import database from "../models/data/index.js"
import databaseConfig from "../configs/db.config.js"

const User = database.user
const secret = databaseConfig.PM_SECRET

const verifyToken = (req, res, next) => {
  let authorization = req.headers["authorization"]
  const token = authorization
  // console.log(token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" })
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" })
    }
    req.userId = decoded.id
    // console.log("req.userId: " + req.userId)
    next()
  })
}

const authJWT = {
  verifyToken: verifyToken
}

// 

export default authJWT
