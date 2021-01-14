import SetOfRoom from "../class/SetOfRoom";
import {Server, Socket} from "socket.io";

export default (UserRoomForTournament: SetOfRoom, socket: Socket, io: Server) => () => {
    console.log('In start tournament ... ')
    const currentRoom = UserRoomForTournament.add(socket)
    if(currentRoom)
    {
        if(!UserRoomForTournament.getRoom(currentRoom).isFree())
        {
            io.to(currentRoom).emit('readyToPlay', currentRoom)
        }
    }
}