"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const tryingRegistrationController_1 = __importDefault(require("./controller/tryingRegistrationController"));
const tryingConnectionController_1 = __importDefault(require("./controller/tryingConnectionController"));
const disconnetController_1 = __importDefault(require("./controller/disconnetController"));
const io = socket_io_1.default();
var tabUserWantPlay = [];
io.on('connection', (socket) => {
    console.log('A user has logged');
    socket.on('disconnect', disconnetController_1.default); // Voir pour passer le tab en param puis suprimer l'id du socket si deco
    socket.on('tryingRegistration', tryingRegistrationController_1.default(socket));
    socket.on('tryingConnection', tryingConnectionController_1.default(socket, io));
    socket.on('wantToPlay', (username) => {
        console.log(username + ' want to play');
        tabUserWantPlay.push({
            id: socket.id,
            name: username
        });
        if (tabUserWantPlay.length >= 2) {
            console.log('Two user want play together !');
            //const otherUser = tabUserWantPlay.filter(e => e !== socket.id)[0]
            io.to(tabUserWantPlay[0].id).emit('readyToPlay', tabUserWantPlay[1]);
            io.to(tabUserWantPlay[1].id).emit('readyToPlay', tabUserWantPlay[0]);
            tabUserWantPlay = [];
        }
    });
    socket.on('haveChoosed', (partner, value) => {
        //console.log('In haveChoosed')
        io.to(partner.id).emit('partnerHaveChoosed', value);
    });
});
io.listen(8080);
console.log('listening on port : 8080');
