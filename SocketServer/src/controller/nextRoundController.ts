import SetOfRoom from "../class/SetOfRoom";
import {Server, Socket} from "socket.io";

export default (UserRoomForTournament: SetOfRoom, WinRoom: SetOfRoom, LooseRoom: SetOfRoom, socket: Socket, io: Server) => (isWin: boolean) => {
    console.log('In nextRound event : ')
    UserRoomForTournament.remove(socket)
    socket.leave('UserRoomForTournament0')
    console.log(socket.rooms)
    if(isWin)
    {
        const currentRoom =  WinRoom.add(socket)
        if(currentRoom)
        {
            if(!WinRoom.getRoom(currentRoom).isFree())
            {
                console.log('Dans win, ready to play emit ....')
                io.to(currentRoom).emit('readyToPlay', currentRoom)
            }
        }
    }
    else
    {
        const currentRoom = LooseRoom.add(socket)
        if(currentRoom)
        {
            if(!LooseRoom.getRoom(currentRoom).isFree())
            {
                console.log('Dans loose, ready to play emit ....')
                io.to(currentRoom).emit('readyToPlay', currentRoom)
            }
        }
    }
}