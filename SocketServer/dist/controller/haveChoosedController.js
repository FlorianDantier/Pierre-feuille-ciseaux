"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("../class/handleDataBase/Game"));
const reqGame_1 = __importDefault(require("../class/handleDataBase/reqGame"));
const connectDB_1 = __importDefault(require("../connectDB"));
exports.default = (socket, storeGame) => (room, value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('In haveChoosed');
    console.log('Value room : ', room);
    let lastIdGame = undefined;
    if (storeGame.length === 0) {
        const coDB = yield connectDB_1.default();
        const rg = new reqGame_1.default(coDB);
        lastIdGame = yield rg.getLastIdGame();
    }
    console.log('Value lastIdGame : ', lastIdGame);
    storeGame.push(new Game_1.default({
        choice: value,
        user: socket.userName,
        idManche: storeGame.length,
        idGame: lastIdGame !== undefined ? lastIdGame + 1 : storeGame[0].idGame
    }));
    //console.log('content of storegame : ', storeGame)
    socket.to(room).emit('partnerHaveChosen', value);
});
