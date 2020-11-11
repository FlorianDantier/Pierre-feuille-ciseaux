"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Améliorer ce système ...
var selectorRoom = 0;
exports.default = (io, socket) => {
    return (username) => {
        console.log(username + ' want to play');
        const currentRoom = `room${selectorRoom}`;
        socket.join(currentRoom);
        const numberUserInRoom = io.nsps['/'].adapter.rooms[currentRoom].length;
        if (numberUserInRoom >= 2) {
            console.log('Two user want play together !');
            io.to(currentRoom).emit('readyToPlay', currentRoom);
            selectorRoom = selectorRoom + 1;
        }
    };
};
