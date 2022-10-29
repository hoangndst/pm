import database from "../models"
import config from "../configs/auth.config"
import jwt from "jsonwebtoken"
import bycrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const User = database.users
const Role = database.roles
const secret = process.env.PM_SECRET
const refreshSecret = process.env.PM_REFRESH_SECRET

const SignIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not Found" })
    }
    const passwordIsValid = bycrypt.compareSync(
      req.body.password,
      user.password
    )
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password"
      })
    }
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400
    })

    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, {
      expiresIn: 86400
    })
    // save toke and refresh token to database
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken: refreshToken
    })
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}

const SignUp = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
}

export { SignIn }