"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (BotsRoom, socket) => () => {
    console.log('In wantToPlayAgainstBot ...');
    if (!BotsRoom.add(socket)) {
        console.log('Error no free room');
        socket.emit('NoFreeRoom');
    }
    else {
        socket.emit('readyToPlayAgainstBot');
    }
};
