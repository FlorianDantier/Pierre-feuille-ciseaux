import SetOfRoom from "../class/SetOfRoom";
import {Socket} from "socket.io";

export default (BotsRoom: SetOfRoom, socket: Socket) => () => {
    console.log('In disconnecting')
    BotsRoom.remove(socket)
}