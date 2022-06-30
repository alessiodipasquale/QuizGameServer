const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const config = require('./config/config');

config()

const port = process.env.PORT;
const bodyParser = require('body-parser')
const cors = require('cors');
const ioHandler = require('./socketHandlers/ioHandler');
const app = express()
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', ioHandler(io))

server.listen(port, () => console.log('Server listening on '+port))
