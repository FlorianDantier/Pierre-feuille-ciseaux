"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("./Room"));
class SetOfRoom {
    constructor(size, capacity) {
        this.size = size;
        this.capacity = capacity;
        this._size = size;
        this._Rooms = new Array(size);
        for (let i = 0; i < this._size; i++) {
            this._Rooms[i] = new Room_1.default(capacity, `room${i}`);
        }
    }
    // Retourne truc si le socket a bien rejoint un salon, faux sinon
    add(socket) {
        const RoomsFree = this._Rooms.filter(e => e._isFree === true);
        let firstRoomFree;
        if (RoomsFree.length > 0) {
            firstRoomFree = RoomsFree[0];
            const index = this._Rooms.findIndex(e => e._name === firstRoomFree._name);
            this._Rooms[index]._isFree = false;
            socket.join(firstRoomFree._name);
            return true;
        }
        else {
            return false;
        }
    }
    remove(socket) {
        const roomIfExist = Object.keys(socket.rooms);
        console.log(roomIfExist);
        if (Object.keys(socket.rooms)[1]) {
            const room = Object.keys(socket.rooms)[1];
            const index = this._Rooms.findIndex(e => e._name === room);
            this._Rooms[index]._isFree = true;
            socket.leave(room);
            console.log(`Le socket a été retiré du salon ${Object.keys(socket.rooms)[1]}`);
        }
        else {
            console.log('Pas de salon pour le socket donc pas de leave');
        }
    }
}
exports.default = SetOfRoom;
