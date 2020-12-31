"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../connectDB"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (socket, io) => (ID) => __awaiter(void 0, void 0, void 0, function* () {
    ID.userName = ID.userName.toLowerCase();
    console.log('In tryingConnection');
    const db = yield connectDB_1.default();
    const result = yield db.get('SELECT * FROM Users WHERE userName=(?)', [ID.userName]);
    if (result) {
        const same = yield bcrypt_1.default.compare(ID.password, result.password);
        if (same) {
            const userName = result.userName;
            socket.userName = userName;
            console.log('Socket.username = ', socket.userName);
            console.log('Succesfull connection !');
            socket.emit('connected', userName);
        }
        else {
            console.log('Error userName or password');
        }
    }
    else {
        console.log('Error userName or password');
    }
});
