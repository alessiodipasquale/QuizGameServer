const { v4: uuid } = require('uuid');
const gamesManager = (socket) => {
    class Game {
        _id;
        name;
        questions;
        status;
        players;
        constructor(id = uuid(), name = '', questions = [], status = 'waiting', players = []) {
            this._id = id,
            this.name = name,
            this.questions = questions,
            this.status = status,
            this.players = players
        }
    }
    const GamesArray = [
        new Game(1,"Partita tra amici", {question: 'domanda',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'},'waiting'),
        new Game(2,"Partita tra amici", {question: 'domanda',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'},'joinable')
    ]  

    const joinGame = async (data, callback) =>  {
        try {
            if (!data.id)
                throw new Error()
            //socket.join(data.id)
            const game = GamesArray.find(el => el._id == data.id);
            game.players.push({playerName: data.name});
           // socket.to(data.id).emit("joined", data.name)
            callback()
        } catch (err) {
            callback(new Error())
        }
    }

    const getPlayersOfGame = async (data, callback) => {
        try {
            const results = GamesArray.find(el => el._id == data.id)
            callback(results)
        } catch (err) {
            callback(new Error())
        }
    }

    const createGame = async (data,callback) => {
        try {
            const game = new Game();
            GamesArray.push(game)
            console.log('Game created.')
            callback(game._id)
        } catch (err) {
            callback(new Error())
        }
    }

    const configureGame = async (data,callback) => {
        try {
            console.log(data)
            if (!data.id || !data.name || !data.questions)
                throw new Error();
            const id = data.id
            const game = GamesArray.find(el => el._id == id);
            if (!game) {
                throw new Error()
            }
            game.name = data.name
            game.questions = data.questions
            game.status = 'joinable'
            callback(game)
        } catch (err) {
            callback(new Error())
        }
    }

    const getGames = async (data, callback) => {
         try{
            callback(GamesArray.map(el => el.questions))
         } catch (err) {
            callback(new Error())
         }
    }

    const getJoinableGames = async (data, callback) => {
        try {
            const games = GamesArray.filter(el => el.status=='joinable')
            results = []
            games.forEach(game => {
                results.push({id: game._id, name: game.name})
            })
            callback(results)
        } catch (err) {
            callback(new Error());
        }
    }


    
    socket.on('createGame',createGame);
    socket.on('getGames',getGames)
    socket.on('configureGame',configureGame)
    socket.on('getJoinableGames',getJoinableGames)
    socket.on('joinGame',joinGame)
    socket.on('getPlayersOfGame',getPlayersOfGame)
}
module.exports = gamesManager