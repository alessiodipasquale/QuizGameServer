const Game = require('./Game')

let GamesArray = []


const gamesManager = {



    initialize: () => {
        GamesArray.push(new Game(1,"Partita tra amici", {question: 'domanda',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'},'waiting'))
        GamesArray.push(new Game(2,"Partita tra amici", {question: 'domanda',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'},'joinable'))
    },


    getGames: () => {
        return GamesArray
    }
}

module.exports = gamesManager;