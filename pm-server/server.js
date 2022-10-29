import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from 'body-parser'
import env from 'dotenv'

env.config()
app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.status(200).json({ message: process.env.DB_HOST })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})