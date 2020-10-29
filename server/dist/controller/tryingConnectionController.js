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
exports.default = (socket, io) => {
    return (ID) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Dans tryingConnection');
        const db = yield connectDB_1.default();
        const result = yield db.get('SELECT * FROM Users WHERE userName=(?) AND password=(?)', [ID.userName, ID.password]);
        if (result) {
            const userName = result.userName;
            console.log('Succesfull connection !');
            socket.emit('connected', userName);
        }
        else {
            console.log('Error userName or password');
        }
    });
};
