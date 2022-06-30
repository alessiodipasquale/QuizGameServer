const gamesManager = require('../gamesManager')
const ioGames = require('./ioGames')

const ioHandler = (io) => (socket) => {
   gamesManager.initialize()
   ioGames(socket)
}

module.exports = ioHandler