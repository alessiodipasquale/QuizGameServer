const { v4: uuid } = require('uuid');

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

module.exports = Game