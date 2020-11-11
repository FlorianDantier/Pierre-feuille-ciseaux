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
const io = socket_io_1.default();
io.on('connection', (socket) => {
    console.log('A user has logged');
    socket.on('disconnect', disconnetController_1.default); // Voir pour passer le tab en param puis suprimer l'id du socket si deco
    socket.on('tryingRegistration', tryingRegistrationController_1.default(socket));
    socket.on('tryingConnection', tryingConnectionController_1.default(socket, io));
    socket.on('wantToPlay', wantToPlayController_1.default(io, socket));
    socket.on('haveChoosed', haveChoosedController_1.default(socket));
    socket.on('wantToPlayAgainstBot', () => {
        console.log('In wantToPlayAgainstBot ...');
    });
});
io.listen(8080);
console.log('listening on port : 8080');