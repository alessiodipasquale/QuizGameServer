const gamesManager = require('./gamesManager')

const ioHandler = (io) => (socket) => {
   gamesManager(socket)
}

module.exports = ioHandler