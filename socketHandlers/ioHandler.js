const ioGames = require('./ioGames')

const ioHandler = (io) => (socket) => {
   console.log(socket.id);
   ioGames(socket)
}

module.exports = ioHandler