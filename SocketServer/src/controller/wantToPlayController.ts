import { Socket, Server } from "socket.io";
import SetOfRoom from "../class/SetOfRoom";

export default (UsersRoom: SetOfRoom ,io: Server, socket: Socket | any) => (username: string) => {
    console.log(username + ' want to play')
    const currentRoom = UsersRoom.add(socket)
    //console.log('room joined : ' + currentRoom)
    if(currentRoom)
    {
        if(!UsersRoom.getRoom(currentRoom).isFree())
        {
            io.to(currentRoom).emit('readyToPlay', currentRoom)
        }
    }
  }

