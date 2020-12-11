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
const gameFinishedController_1 = __importDefault(require("./controller/gameFinishedController"));
const connectDB_1 = __importDefault(require("./connectDB"));
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
let UsersRoom = new SetOfRoom_1.default(10, 10);
var storeGame = []; // Faire une classe pour gérer ça
io.on('connection', (socket) => {
    console.log('A user has logged');
    socket.on('disconnect', disconnetController_1.default); // Voir pour passer le tab en param puis suprimer l'id du socket si deco
    socket.on('disconnecting', disconnectingController_1.default(BotsRoom, socket));
    socket.on('tryingRegistration', tryingRegistrationController_1.default(socket));
    socket.on('tryingConnection', tryingConnectionController_1.default(socket, io));
    socket.on('wantToPlay', wantToPlayController_1.default(UsersRoom, io, socket));
    socket.on('haveChosen', haveChoosedController_1.default(socket, storeGame));
    socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController_1.default(BotsRoom, socket));
    socket.on('PlayAgainstBot', playAgainstBotController_1.default(BotsRoom, socket, io));
    socket.on('gameFinished', gameFinishedController_1.default(socket, io, storeGame));
    socket.on('showStats', (currentUser) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('In show stats');
        if (socket.id === undefined)
            console.log('Error : No id on this socket !');
        const coDB = yield connectDB_1.default();
        const result = yield coDB.all('SELECT * FROM Game WHERE user1=(?) OR user2=(?)', [currentUser, currentUser]);
        console.log(result);
        io.to(socket.id).emit('getStats', result);
        // Avant d'enregistrer : vérifier que l'on ai bien une partie fini (pas de déco ou autre coupure)
        // Gérer les match null
        // Quiter la page après partie fini
    }));
});
io.listen(8080);
console.log('listening on port : 8080');
