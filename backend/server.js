require('dotenv').config()
const express = require('express')
const server = express()
const port = process.env.PORT || 3001
const db = require('../backend/db/db')

server.set('view engine', 'ejs')
server.use(express.json())
server.use(express.static(__dirname + '/views'))
server.use(express.static(__dirname + '/views' + '/js'))
server.use(express.static(__dirname + '/views' + '/css'))

server.get('/', (req, res) => {
    res.render('index')
})

const apiRouter = require('./routes/api')

server.use('/api', apiRouter)

server.listen(port, () => { console.log(`Server starte on http://localHost:${port}`);})