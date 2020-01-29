const express= require('express')
const server = express()
const cors = require('cors')
server.use(cors())
server.use(express.json())
const userRoutes = require('./users/user-routes')


server.use('/api', userRoutes)
 


module.exports = server;