import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from 'body-parser'
import env from 'dotenv'
import database from './models/index.js'
import userRoutes from './routes/user.routes.js'

env.config()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.status(200).json({ message: process.env.DB_HOST })
})

database.sequelize.sync({ force: true }).then(() => {
  console.log('Synced with database')
}).catch((err) => {
  console.log('Error syncing with database', err)
})

userRoutes(app)
// teamRoutes(app)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})