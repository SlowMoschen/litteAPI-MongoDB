const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, { useNewUrlParser: true })
const db = mongoose.connection
db.collection('subscriber_area')
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

module.exports = db