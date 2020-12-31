import connectDB from "../connectDB";
import {Server, Socket} from "socket.io";

export default  (io: Server, socket: Socket) => async (currentUser: string) => {
    console.log('In show stats')
    if(socket.id === undefined) console.log('Error : No id on this socket !')
    const coDB = await connectDB()
    const result = await coDB.all('SELECT * FROM Game WHERE user1=(?) OR user2=(?)', [currentUser, currentUser])
    console.log('Result stats = ' ,result)
    io.to(socket.id).emit('getStats', result)
}