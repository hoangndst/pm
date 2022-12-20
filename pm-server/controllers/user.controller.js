import database from "../models/data/index.js"
import { Op } from "sequelize"

// insert new user
export const createUser = (req, res) => {
  database.user.findOne({ where: { id: req.body.id } })
    .then((user) => {
      if (user) {
        res.status(200).send({
          message: "User already exists",
          user: user
        })
      } else {
        const user = {
          id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          birth_date: req.body.birth_date,
        }
        database.user.create(user)
          .then((user) => {
            res.status(200).send({
              message: "User created successfully",
              user: user
            })
          })
          .catch((error) => {
            res.status(500).send({
              message: error.message
            })
          }
          )
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message
      })
    })
}

// get user
export const getUser = (req, res) => {
  database.user.findOne({
    where: {
      id: req.query.id
    }
  }).then((user) => {
    res.status(200).send(user)
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}

// search users by search string username, name or email
export const searchUsers = (req, res) => {
  const searchString = req.query.searchString
  if (searchString) {
    database.user.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${searchString}%` } },
          { first_name: { [Op.like]: `%${searchString}%` } },
          { last_name: { [Op.like]: `%${searchString}%` } }
        ]
      },
      attributes: ["id", "username", "first_name", "last_name"]
    }).then((users) => {
      res.status(200).send(users)
    }).catch((err) => {
      res.status(500).send({ message: err.message })
    })
  } else {
    res.status(200).send([])
  }
}