"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (socket) => {
    return (room, value) => {
        console.log('In haveChoosed');
        console.log(room);
        socket.to(room).emit('partnerHaveChoosed', value);
    };
};
