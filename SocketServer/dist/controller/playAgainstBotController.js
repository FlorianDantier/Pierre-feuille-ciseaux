"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("../class/bot"));
var Strategy;
(function (Strategy) {
    Strategy[Strategy["Strat1"] = 0] = "Strat1";
    Strategy[Strategy["Strat2"] = 1] = "Strat2";
    Strategy[Strategy["Random"] = 2] = "Random";
})(Strategy || (Strategy = {}));
exports.default = (BotRooms, socket, io) => () => {
    console.log('Rooms of socket : ', Object.keys(socket.rooms));
    const room = Object.keys(socket.rooms)[1];
    let b = new bot_1.default(Strategy.Random);
    const botChoice = b.getChoice();
    io.to(room).emit('botHaveChosen', botChoice);
};
