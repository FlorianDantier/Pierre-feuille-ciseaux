"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (UsersRoom, io, socket) => (username) => {
    console.log(username + ' want to play');
    const currentRoom = UsersRoom.add(socket);
    console.log('room joined : ' + currentRoom);
    if (currentRoom) {
        console.log(username + ' a rejoint le salon ' + currentRoom);
        const numberUserInRoom = io.nsps['/'].adapter.rooms[currentRoom].length;
        socket.numberUser = numberUserInRoom;
        if (numberUserInRoom >= 2) {
            console.log('Two user want play together !');
            io.to(currentRoom).emit('readyToPlay', currentRoom);
        }
    }
};
