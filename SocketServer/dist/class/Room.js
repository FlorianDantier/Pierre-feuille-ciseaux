"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(__capacity, name) {
        this.__capacity = __capacity;
        this.name = name;
        this._capacity = __capacity;
        this._name = name;
    }
    add(socket) {
        console.log('capacity : ', this._capacity);
        if (this._capacity > 0) {
            console.log('In capacity >  0');
            socket.join(this._name);
            this._capacity--;
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
            console.log('leave room... ' + this._name);
            return true;
        }
        else {
            return false;
        }
    }
    isFree() {
        return this._capacity > 0;
    }
}
exports.default = Room;
