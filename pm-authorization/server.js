import express from 'express'
import cors from 'cors'
import database from './models/index.js'
import route from './routes/auth.route.js'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 5001
const Role = database.roles
const User = database.users

app.use(cors())
app.use(bodyParser.json())

database.sequelize.sync({ force: true }).then(() => {
  console.log('Synced with database')
  initial()
}).catch((err) => {
  console.log('Error syncing with database', err)
})

const initial = () => {
  Role.create({
    id: 1,
    name: 'user'
  })
  Role.create({
    id: 2,
    name: 'moderator'
  })
  Role.create({
    id: 3,
    name: 'admin'
  })
}


route(app)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to pm-authorization application.' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

