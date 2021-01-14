import SetOfRoom from "../class/SetOfRoom";
import {Server, Socket} from "socket.io";

export default (TournamentRoom: SetOfRoom, socket: Socket, io: Server) => () => {
    console.log('In want to join tournament')
    const currentRoom = TournamentRoom.add(socket)
    console.log('Value\'s CurrentRoom : ',currentRoom)
    if(currentRoom)
    {
        if(!TournamentRoom.getRoom(currentRoom).isFree())
        {
            io.to(currentRoom).emit('MidStartTournament')
        }
    }
}