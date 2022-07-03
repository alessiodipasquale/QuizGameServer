const ioGames = require('./ioGames')

const ioHandler = (io) => (socket) => {
   console.log("in ioHandler");
   console.log(socket.id);
   socket.on('disconnect', () => console.log('disconnected'));
   ioGames(socket)
}

module.exports = ioHandler