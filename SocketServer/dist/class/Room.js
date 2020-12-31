"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(capacity, name) {
        this.capacity = capacity;
        this.name = name;
        this._capacity = capacity;
        this._isFree = true;
        this._name = name;
    }
    add(socket) {
        console.log('capacity : ', this._capacity);
        if (this._capacity > 0) {
            console.log('In capacity >  0');
            socket.join(this._name);
            this._capacity -= 1;
            if (this._capacity === 0) {
                this._isFree = false;
            }
            return this._name;
        }
        else {
            console.log('Not in capacity > 0');
            return undefined;
        }
    }
    remove(socket) {
        const roomOfSocket = Object.keys(socket.rooms);
        const test = roomOfSocket.filter(e => e === this._name);
        if (test !== []) {
            socket.leave(this._name);
            this._capacity++;
            console.log('leave room...');
            return true;
        }
        else {
            return false;
        }
    }
    get isFree() {
        return this._isFree;
    }
}
exports.default = Room;
