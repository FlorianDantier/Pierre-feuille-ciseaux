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
exports.default = (socket) => {
    return (ID) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('In server socket.on("registation")');
        const db = yield connectDB_1.default();
        const verif = yield db.get('SELECT * FROM Users WHERE userName=(?)', [ID.userName]);
        if (verif) {
            console.log('Error user name is not available');
            socket.emit('userNameNotAvailable');
        }
        else {
            const request = 'INSERT INTO Users VALUES ((?),(?))';
            const result = yield db.run(request, [ID.userName, ID.password]);
            console.log('User stored');
        }
    });
};
