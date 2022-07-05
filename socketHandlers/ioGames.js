const { v4: uuid } = require('uuid');
const gamesManager = require('../gamesManager');
const Game = require('../Game')
 
const ioGames = (socket) => {
    
    //Può servire in altre chiamate per aggiornare la lista di partite?
    GamesArray = gamesManager.getGames()
    
    const joinGame = async (data, callback) =>  {
        console.log('joinGame')
        try {
            if (!data.id)
                throw new Error()
            socket.join(data.id)
            const game = GamesArray.find(el => el.id == data.id);
            game.players.push({id: socket.id, name: data.name, points: 0});
            socket.to(game.id).emit("joined", data.name)
            console.log(socket.id+' joined in '+game.id)
            callback(data.name)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const quitGame = async(callback) => {
        console.log(socket.id+ ' Disconnected')
        console.log('quitGame')
        try {
            GamesArray.forEach(game => {
                if(game.admin == socket.id) {
                    console.log("Delete by admin");
                    //Avvisi tutti di uscire dalla partita
                    socket.to(game.id).emit("gameStoppedByAdmin");
                    //Aggiorno i giochi eliminando quello
                    GamesArray = GamesArray.filter(el => el.admin != socket.id);
                    console.log(GamesArray);
                } else {
                    game.players.forEach(el => {
                        if(el.id == socket.id) {
                            game.players = game.players.filter(el => el.id != socket.id)
                            playerName = el.name
                            socket.to(game.id).emit("playerQuitted", playerName);
                        }

                    });
                }
            });
            console.log(GamesArray);
           
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const startGame = async (data, callback) => {
        console.log('startGame')
        console.log (data);
        try {
            if (!data.id)
                throw new Error()
            
            const game = GamesArray.find(el => el.id == data.id);
            game.status = 'playing';
            game.currentQuestion = 0;
            socket.broadcast.emit('gameNowPlaying',game.name);
            callback(data.id)

            //socket.to(data.id).emit('startGame');
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(game.questions.length)
            if (game.questions.length !== 0) {
                question = game.questions[game.currentQuestion]
                socket.to(data.id).emit('question',question);
                game.currentQuestion = game.currentQuestion+1; 
                socket.to(data.id).emit('startTimer');
                await new Promise(resolve => setTimeout(resolve, 10000));
                socket.to(data.id).emit('endTimer');

            }
            else
                socket.to(data.id).emit('gameEnded');

            
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const sendAnswer = async (data, callback) => {
        /*
                 obj.put("id",id);
                obj.put("responseIndex", responseIndex);
                obj.put("actualQuestion",actualQuestion);
        */
        console.log('sendAnswer')
        try {
            console.log(data)
            if(!data.id || !data.responseIndex || !data.actualQuestion)
                throw new Error();
            const game = GamesArray.find(el => el.id == data.id);
            console.log(game.questions)
            question = game.questions.find(el => el.question == data.actualQuestion);
            console.log(question);
            correct = question.correctIndex == data.responseIndex
            if(correct) {
                player = game.players.find(el => el.id == socket.id);
                player.points +=1;
            }
            callback(correct)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }


    const getPlayersOfGame = async (data, callback) => {
        console.log('getPlayersOfGame')
        try {
            const results = GamesArray.find(el => el.id == data.id)
            callback(results)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const createGame = async (callback) => {
        console.log('createGame')
        try {
            const game = new Game(socket.id);
            GamesArray.push(game)
            console.log('Game created.')
            socket.join(game.id)
            callback(game.id)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const configureGame = async (data,callback) => {
        console.log('configureGame')

        try {
            if (!data.id || !data.name || !data.questions || !data.numberOfPlayers)
                throw new Error();
            const id = data.id
            const game = GamesArray.find(el => el.id == id);
            if (!game) {
                throw new Error()
            }
            game.name = data.name

            console.log(data.questions)

            //controlli su formattazione di questions
            data.questions.forEach(item => {
                if(!item.question || !item.answer1 || !item.answer2 || !item.answer3 || !item.answer4 || !item.correctIndex)
                    throw new Error();
            });
            game.questions = data.questions

            game.status = 'joinable'
            console.log(game)
            socket.broadcast.emit('newJoinableGame', game)
            callback(game.id)
        } catch (err) {
            console.log(err)
            callback(new Error())
        }
    }

    const getGames = async (data, callback) => {
        console.log('getGames')

         try{
            callback(GamesArray)
         } catch (err) {
            console.log(err)
            callback(new Error())
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
    socket.on('sendAnswer',sendAnswer)
    socket.on('disconnect', quitGame);


    socket.on('timer', ()=> socket.broadcast.emit('startTimer'));
}
module.exports = ioGames