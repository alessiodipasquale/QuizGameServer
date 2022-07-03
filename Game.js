const { v4: uuid } = require('uuid');

class Game {
    id;
    name;
    questions;
    status;
    numberOfPlayers;
    players;
    admin;
    constructor(admin,name = '', questions = [], status = 'waiting', players = [], numberOfPlayers = 0) {
        this.admin = admin;
        this.id = uuid();
        this.name = name;
        this.questions = questions;
        this.status = status;
        this.players = players;
        this.numberOfPlayers = numberOfPlayers;
    }
}

module.exports = Game