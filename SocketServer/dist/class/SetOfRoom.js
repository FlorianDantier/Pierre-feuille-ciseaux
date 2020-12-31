"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("./Room"));
class SetOfRoom {
    constructor(numberOfRoom, slotInOneRoom) {
        this.numberOfRoom = numberOfRoom;
        this.slotInOneRoom = slotInOneRoom;
        this._numberOfRoom = numberOfRoom;
        this._Rooms = new Array(numberOfRoom);
        for (let i = 0; i < this._numberOfRoom; i++) {
            this._Rooms[i] = new Room_1.default(slotInOneRoom, `room${i}`);
        }
    }
    // Retourne truc si le socket a bien rejoint un salon, faux sinon
    add(socket) {
        const RoomsFree = this._Rooms.filter(e => e.isFree === true);
        if (RoomsFree[0]) {
            return RoomsFree[0].add(socket);
        }
        else {
            return undefined;
        }
    }
    remove(socket) {
        // On récupère le salon auquel le socket appartient
        const roomIfExist = Object.keys(socket.rooms)[1];
        // Si il y a un salon ...
        if (roomIfExist) {
            this._Rooms.filter(e => e._name === roomIfExist)[0].remove(socket);
        }
        else {
            console.log('Pas de salon pour le socket donc pas de leave');
        }
    }
}
exports.default = SetOfRoom;
