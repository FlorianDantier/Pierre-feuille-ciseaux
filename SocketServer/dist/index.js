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
const gameFinishedController_1 = __importDefault(require("./controller/gameFinishedController"));
const showStatsController_1 = __importDefault(require("./controller/showStatsController"));
const closeRoomController_1 = __importDefault(require("./closeRoomController"));
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
const sizeTournament = 4;
let BotsRoom = new SetOfRoom_1.default(2, 1, 'Bots');
let UsersRoom = new SetOfRoom_1.default(10, 2, 'Users');
let TournamentRoom = new SetOfRoom_1.default(1, sizeTournament, 'Tournament');
let UserRoomForTournament = new SetOfRoom_1.default(sizeTournament / 2, 2, 'UserRoomForTournament');
let WinRoom = new SetOfRoom_1.default(1, 2, 'win');
let LooseRoom = new SetOfRoom_1.default(1, 2, 'loose');
io.on('connection', (socket) => {
    let sg = [];
    console.log('A user has logged');
    socket.on('disconnect', disconnetController_1.default);
    socket.on('disconnecting', disconnectingController_1.default(BotsRoom, socket));
    socket.on('tryingRegistration', tryingRegistrationController_1.default(socket));
    socket.on('tryingConnection', tryingConnectionController_1.default(socket, io));
    socket.on('wantToPlay', wantToPlayController_1.default(UsersRoom, io, socket));
    socket.on('seeRooms', () => {
        console.log('Salon rejoint : ', Object.keys(socket.rooms));
    });
    socket.on('wantToJoinTournament', () => {
        console.log('In want to join tournament');
        const currentRoom = TournamentRoom.add(socket);
        console.log('Value\'s CurrentRoom : ', currentRoom);
        if (currentRoom) {
            if (!TournamentRoom.getRoom(currentRoom).isFree()) {
                io.to(currentRoom).emit('MidStartTournament');
            }
        }
    });
    socket.on('StartTournament', () => {
        console.log('In start tournament ... ');
        const currentRoom = UserRoomForTournament.add(socket);
        if (currentRoom) {
            if (!UserRoomForTournament.getRoom(currentRoom).isFree()) {
                io.to(currentRoom).emit('readyToPlay', currentRoom);
            }
        }
    });
    socket.on('nextRound', (isWin) => {
        console.log('In nextRound event : ');
        UserRoomForTournament.remove(socket);
        socket.leave('UserRoomForTournament0');
        console.log(socket.rooms);
        if (isWin) {
            const currentRoom = WinRoom.add(socket);
            if (currentRoom) {
                if (!WinRoom.getRoom(currentRoom).isFree()) {
                    console.log('Dans win, ready to play emit ....');
                    io.to(currentRoom).emit('readyToPlay', currentRoom);
                }
            }
        }
        else {
            const currentRoom = LooseRoom.add(socket);
            if (currentRoom) {
                if (!LooseRoom.getRoom(currentRoom).isFree()) {
                    console.log('Dans loose, ready to play emit ....');
                    io.to(currentRoom).emit('readyToPlay', currentRoom);
                }
            }
        }
    });
    socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController_1.default(BotsRoom, socket));
    socket.on('PlayAgainstBot', playAgainstBotController_1.default(BotsRoom, socket, io));
    socket.on('haveChosen', haveChoosedController_1.default(socket, sg));
    socket.on('gameFinished', gameFinishedController_1.default(socket, io, sg));
    socket.on('showStats', showStatsController_1.default(io, socket));
    socket.on('closeRoom', closeRoomController_1.default(UsersRoom, socket));
});
io.listen(8080);
console.log('listening on port : 8080');
