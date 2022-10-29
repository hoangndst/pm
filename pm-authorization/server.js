import express from 'express'
import cors from 'cors'
import database from './models'

const app = express()
const PORT = process.env.PORT || 5001
const Role = database.roles

app.use(cors())

database.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }')
})

