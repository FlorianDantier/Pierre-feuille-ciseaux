import SetOfRoom from "./class/SetOfRoom";
import {Socket} from "socket.io";

export default (UsersRoom: SetOfRoom, socket: Socket) => () => {
    console.log('In closeRoom event : ')
    UsersRoom.remove(socket)
}