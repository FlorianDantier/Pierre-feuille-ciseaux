"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("../class/handleDataBase/Game"));
exports.default = (socket, storeGame) => (room, value) => {
    if (socket.count === undefined) {
        socket.count = 0;
    }
    console.log('In haveChoosed');
    console.log(room);
    console.log('In registration socket.username = ', socket.userName);
    if (socket.count === storeGame.length) {
        storeGame.push(new Game_1.default(undefined));
    }
    if (socket.numberUser === 1) {
        storeGame[socket.count].user1 = socket.userName; // Voir si on peut pas hériter de socket puis rajouter cette attribut plutot que de faire ainsi
        storeGame[socket.count].user1Choice = value;
        storeGame[socket.count].idManche = socket.count;
    }
    if (socket.numberUser === 2) {
        storeGame[socket.count].user2 = socket.userName;
        storeGame[socket.count].user2Choice = value;
    }
    socket.count++;
    socket.to(room).emit('partnerHaveChosen', value);
};
