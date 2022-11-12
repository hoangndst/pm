import database from "../models/index.js"
import jwt from "jsonwebtoken"
import bycrypt from "bcryptjs"
import dotenv from "dotenv"
import EmailService from "../services/email.service.js"
import { Op } from "sequelize"

dotenv.config()

const User = database.users
const Role = database.roles
const RefreshTokens = database.refreshTokens
const secret = process.env.PM_SECRET
const refreshSecret = process.env.PM_REFRESH_SECRET

const SignIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "User and/or password is incorrect" })
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({ message: "User and/or password is incorrect" })
    }
    const token = jwt.sign({ id: user.id }, secret, {
      // 1 hour
      expiresIn: 3600
    })

    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, {
      // 24 hours
      expiresIn: 86400
    })
    
    /**
     * Save refresh token to database.
     */
    
    RefreshTokens.create({
      userId: user.id,
      token: refreshToken
    }).then(() => {
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        accessToken: token,
        refreshToken: refreshToken
      })
    }).catch((err) => {
      res.status(500).send({ message: err.message })
    })
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}

const SignUp = (req, res) => {
  console.log(req.body)
  User.findAll({
    where: {
      [Op.or]: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    }
  }).then((users) => {
    if (users.length) {
      if (users.length > 1) {
        return res.status(400).send({ message: "Username and email already in use" })
      } else if (users[0].username === req.body.username) {
        return res.status(400).send({ message: "Username already in use" })
      } else if (users[0].email === req.body.email) {
        return res.status(400).send({ message: "Email already in use" })
      }
    } else {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: bycrypt.hashSync(req.body.password, 8)
      }).then((user) => {
        EmailService.sendVerificationEmail(user.email, user.username)
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" })
        }).catch((err) => {
          res.status(500).send({ message: err.message })
        })
      }).catch((err) => {
        res.status(500).send({ message: err.message })
      })
    }
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}

const SignOut = (req, res) => {
  RefreshTokens.destroy({
    where: {
      user_id: req.body.userId,
    }
  }).then(() => {
    res.status(200).send({ message: "User signed out successfully" })
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}

export { SignIn, SignUp, SignOut }