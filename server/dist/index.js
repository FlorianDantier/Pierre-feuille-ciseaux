"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const tryingRegistrationController_1 = __importDefault(require("./controller/tryingRegistrationController"));
const tryingConnectionController_1 = __importDefault(require("./controller/tryingConnectionController"));
const disconnetController_1 = __importDefault(require("./controller/disconnetController"));
const wantToPlayController_1 = __importDefault(require("./controller/wantToPlayController"));
const haveChoosedController_1 = __importDefault(require("./controller/haveChoosedController"));
const SetOfRoom_1 = __importDefault(require("./class/SetOfRoom"));
const disconnectingController_1 = __importDefault(require("./controller/disconnectingController"));
const wantToPlayAgainstBotController_1 = __importDefault(require("./controller/wantToPlayAgainstBotController"));
const playAgainstBotController_1 = __importDefault(require("./controller/playAgainstBotController"));
var Choice;
(function (Choice) {
    Choice[Choice["Pierre"] = 0] = "Pierre";
    Choice[Choice["Feuiile"] = 1] = "Feuiile";
    Choice[Choice["Ciseaux"] = 2] = "Ciseaux";
})(Choice || (Choice = {}));
var Strategy;
(function (Strategy) {
    Strategy[Strategy["Strat1"] = 0] = "Strat1";
    Strategy[Strategy["Strat2"] = 1] = "Strat2";
    Strategy[Strategy["Random"] = 2] = "Random";
})(Strategy || (Strategy = {}));
const io = socket_io_1.default();
let BotsRoom = new SetOfRoom_1.default(2, 1);
var globalRoomBot = 1000;
io.on('connection', (socket) => {
    console.log('A user has logged');
    socket.on('disconnect', disconnetController_1.default(socket)); // Voir pour passer le tab en param puis suprimer l'id du socket si deco
    socket.on('disconnecting', disconnectingController_1.default(BotsRoom, socket));
    socket.on('tryingRegistration', tryingRegistrationController_1.default(socket));
    socket.on('tryingConnection', tryingConnectionController_1.default(socket, io));
    socket.on('wantToPlay', wantToPlayController_1.default(io, socket));
    socket.on('haveChosen', haveChoosedController_1.default(socket));
    socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController_1.default(BotsRoom, socket));
    socket.on('PlayAgainstBot', playAgainstBotController_1.default(BotsRoom, socket, io));
});
io.listen(8080);
console.log('listening on port : 8080');
