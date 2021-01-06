"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (UsersRoom, io, socket) => (username) => {
    console.log(username + ' want to play');
    const currentRoom = UsersRoom.add(socket);
    //console.log('room joined : ' + currentRoom)
    if (currentRoom) {
        if (!UsersRoom.getRoom(currentRoom).isFree()) {
            io.to(currentRoom).emit('readyToPlay', currentRoom);
        }
    }
};
