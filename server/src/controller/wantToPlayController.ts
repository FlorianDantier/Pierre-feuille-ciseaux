import { Socket, Server } from "socket.io";

// Améliorer ce système ...
var selectorRoom: number = 0

interface idAndName{
  id: string,
  name: string
}

export default (io: Server, socket: Socket) => {
  return (username: string) => {
    console.log(username + ' want to play');
    const currentRoom = `room${selectorRoom}`;
    socket.join(currentRoom)
    const numberUserInRoom = io.nsps['/'].adapter.rooms[currentRoom].length
    if (numberUserInRoom >= 2)
    {
      console.log('Two user want play together !')
      io.to(currentRoom).emit('readyToPlay', currentRoom)
      selectorRoom = selectorRoom + 1
    }
  }
}
