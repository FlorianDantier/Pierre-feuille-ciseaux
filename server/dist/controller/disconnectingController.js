"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (BotsRoom, socket) => () => {
    console.log('In disconnecting');
    BotsRoom.remove(socket);
};
