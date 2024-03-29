const Game = require('./Game')

//struttura question: ['stringaQuestion', ['answer1', true], ['answer2', false], ['answer3', false], ['answer4', false]]

class Answer{
    constructor(text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }

    get getAnswer(){
        return this;
    }
}

class Question{
    constructor(question, answers) {
        this.question = question;
        this.answers = answers;
    }

    get getQuestion(){
        return this;
    }
}

let GamesArray = []


const gamesManager = {


    initialize: () => {
        // GamesArray.push(new Game(1,"Partita tra amici", [{question: 'domanda1',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'},{question: 'domanda2',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'}],'waiting'))
        // GamesArray.push(new Game(2,"Partita tra amici", [{question: 'domanda1',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'}, {question: 'domanda2',correct: 'risposta',errata1: 'errata1',errata2: 'errata2',errata3: 'errata3'}],'joinable'))
       
    },

    
    

    getGames: () => {
        return GamesArray
    },

    setGames: (games) => {
        GamesArray = games;
    }
}

module.exports = gamesManager;