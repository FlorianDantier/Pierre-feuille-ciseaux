import Bot from "../class/bot";
import SetOfRoom from "../class/SetOfRoom";
import {Server, Socket} from "socket.io";

enum Strategy
{
    Strat1,
    Strat2,
    Random
}

export default (BotRooms: SetOfRoom, socket: Socket, io: Server) => () => {
    console.log('Rooms of socket : ',Object.keys(socket.rooms))
    const room = Object.keys(socket.rooms)[1]
    let b: Bot = new Bot(Strategy.Random)
    const botChoice = b.getChoice()
    io.to(room).emit('botHaveChosen', botChoice)
}