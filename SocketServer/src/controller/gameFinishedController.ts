import DB from "../connectDB";
import reqGame from "../class/handleDataBase/reqGame";
import {Server, Socket} from "socket.io";
import Game from "../class/handleDataBase/Game";

export default (socket: Socket, io: Server, storeGame: Game[]) => async (isTournament: boolean) => {
    console.log('In GameFinishedController : ')

    // console.log('Contenue de store game : ')
    // storeGame.map(e => console.log(e))

    let room: string
    if(isTournament) room = Object.keys(socket.rooms)[2]
    else room = Object.keys(socket.rooms)[1]

    const coDB = await DB()
    const req = new reqGame(coDB)
    storeGame.map(e => {
        req.addLine(e)
    })
    storeGame.splice(0, storeGame.length + 1)
    // console.log('Contenue de store game dans game finished ... ', storeGame)
    socket.to(room).emit('stopGame')
}

