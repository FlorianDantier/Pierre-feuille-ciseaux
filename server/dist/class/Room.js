"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(capacity, name) {
        this.capacity = capacity;
        this.name = name;
        this.capacity = capacity;
        this._isFree = true;
        this._name = name;
    }
    show() {
        console.log(`capacity = ${this.capacity} and isFree = ${this._isFree}`);
    }
}
exports.default = Room;
