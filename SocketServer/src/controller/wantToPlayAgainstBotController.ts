import SetOfRoom from "../class/SetOfRoom";
import {Socket} from "socket.io";

export default (BotsRoom: SetOfRoom, socket: Socket) => () => {
    console.log('In wantToPlayAgainstBot ...')
    if(!BotsRoom.add(socket))
    {
        console.log('Error no free room')
        socket.emit('NoFreeRoom')
    }
    else
    {
        socket.emit('readyToPlayAgainstBot')
    }
}