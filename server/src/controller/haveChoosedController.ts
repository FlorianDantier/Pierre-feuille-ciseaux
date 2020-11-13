import {Socket} from "socket.io"

export default (socket: Socket) => {
    return (room: string, value: string) => {
        console.log('In haveChoosed')
        console.log(room)
        socket.to(room).emit('partnerHaveChoosed', value)
    }
}
