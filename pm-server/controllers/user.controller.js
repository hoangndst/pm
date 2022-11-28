import database from "../models/index.js"

// insert new user
export const createUser = (req, res) => {
  database.user.create({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
  }).then((user) => {
    res.status(200).send(user)
  }).catch((err) => {
    res.status(500).send({ message: err.message })
  })
}