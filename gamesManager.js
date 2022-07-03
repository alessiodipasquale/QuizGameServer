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
        GamesArray.push(
            new Game("1", "Partita tra amici", [
                [
                    'domanda1',
                    ['errata1', false], ['errata2', false], ['errata3', false], ['giusta4', true]
                ], 
                [
                    'domanda2', 
                    ['errata1', false], ['giusta2', true], ['errata3', false], ['errata4', false]
                ]
            ], 'waiting'));

        GamesArray.push(
            new Game("2", "Partita tra amici_2", [
                [
                    'question1', 
                    ['errata1', false], ['errata2', false], ['giusta3', true], ['errata4', false]
                ], 
                [
                    'question2', 
                    ['giusta1', true], ['errata2', false], ['errata3', false], ['errata4', false]
                ]
            ], 'joinable'));

    },

    

    getGames: () => {
        return GamesArray
    }
}

module.exports = gamesManager;