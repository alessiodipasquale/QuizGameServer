const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const config = require('./config/config');

config()

const port = process.env.PORT;
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app)
const io = socketio(server, {
    cors:true,
    origins:["http://127.0.0.1:4200"],
})

io.on('connection', (stream) => {
    console.log('someone connected')
})
server.listen(port, () => console.log('Server listening on '+port))
