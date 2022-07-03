const { v4: uuid } = require('uuid');
const gamesManager = require('../gamesManager');
const Game = require('../Game')
 
const ioGames = (socket) => {
    
    GamesArray = gamesManager.getGames()
    
    const joinGame = async (data, callback) =>  {
        console.log('joinGame')
        try {
            if (!data.id)
                throw new Error()
            socket.join(data.id)
            const game = GamesArray.find(el => el.id == data.id);
            game.players.push({id: socket.id/*, playerName: data.name*/});
            socket.to(game.id).emit("joined", data.name)
            console.log(socket.id+' joined in '+game.id)
            callback(game)
        } catch (err) {
            callback(new Error())
            console.log(err)
        }
    }

    const startGame = async (data, callback) => {
        console.log('startGame')
        console.log (data);
        try {
            if (!data.id)
                throw new Error()
            
            const game = GamesArray.find(el => el.id == data.id);
            socket.to(data.id).emit('startGame');
            await new Promise(resolve => setTimeout(resolve, 200));

            console.log(game.questions.length)
            if (game.questions.length !== 0) {
                question = game.questions.pop()
                socket.to(data.id).emit('question',question);
                socket.to(data.id).emit('startTimer');
                await new Promise(resolve => setTimeout(resolve, 10000));
                socket.to(data.id).emit('endTimer');
            }
            else
                socket.to(data.id).emit('gameEnded');

            
        } catch (err) {
            callback(new Error())
            console.log(err)
        }
    }

    const getPlayersOfGame = async (data, callback) => {
        console.log('getPlayersOfGame')
        try {
            const results = GamesArray.find(el => el.id == data.id)
            callback(results)
        } catch (err) {
            callback(new Error())
            console.log(err)
        }
    }

    const createGame = async (callback) => {
        console.log('createGame')
        try {
            const game = new Game();
            GamesArray.push(game)
            console.log('Game created.')
            callback(game.id)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const configureGame = async (data,callback) => {
        console.log('configureGame')

        try {
            console.log(data)
            if (!data.id || !data.name || !data.questions)
                throw new Error();
            const id = data.id
            const game = GamesArray.find(el => el.id == id);
            if (!game) {
                throw new Error()
            }
            game.name = data.name
            game.questions = data.questions
            console.log(data.questions)
            game.status = 'joinable'
            socket.broadcast.emit('newJoinableGame', game)
            callback(game)
        } catch (err) {
            callback(new Error())
            console.log(err)
        }
    }

    const getGames = async (data, callback) => {
        console.log('getGames')

         try{
            callback(GamesArray)
         } catch (err) {
            callback(new Error())
            console.log(err)
         }
    }

    const getJoinableGames = async (callback) => {
        console.log('getJoinableGames')

        try {
            const games = GamesArray.filter(el => el.status=='joinable')
            results = []
            games.forEach(game => {
                results.push({id: game.id, name: game.name})
            })
            callback(results)
        } catch (err) {
            console.log(err);
            callback(new Error())
        }
    }


    
    socket.on('createGame',createGame);
    socket.on('getGames',getGames)
    socket.on('configureGame',configureGame)
    socket.on('getJoinableGames',getJoinableGames)
    socket.on('joinGame',joinGame)
    socket.on('getPlayersOfGame',getPlayersOfGame)
    socket.on('startGame',startGame)
}
module.exports = ioGames