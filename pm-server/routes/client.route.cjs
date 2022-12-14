const express = require('express')
const path = require('path')
// serve front-end files
const clientRoute = (app) => {
  console.log('clientRoute')
  app.use(express.static(path.join(__dirname, '../../pm-client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../pm-client/build', 'index.html'))
  })
}
module.exports = clientRoute