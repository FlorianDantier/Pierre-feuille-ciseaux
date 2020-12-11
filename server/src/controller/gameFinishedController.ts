import DB from "../connectDB";
import reqGame from "../class/handleDataBase/reqGame";
import {Server, Socket} from "socket.io";
import Game from "../class/handleDataBase/Game";

async function getLastIdGame() : Promise<number>
{
    const coDB = await DB()
    let result = await coDB.get('SELECT idGame FROM Game WHERE idGame = (SELECT MAX(idGame) FROM Game)')
    if(result === undefined)
    {
       return -1
    }
    console.log('In tcheck Game : result = ', result)
    return result.idGame
}

export default (socket: Socket, io: Server, storeGame: Game[]) => async () => {
    console.log('Contenue de store game : ')
    storeGame.map(e => console.log(e))
    const room = Object.keys(socket.rooms)[1]
    const idsSocket = Object.keys(io.nsps['/'].adapter.rooms[room].sockets)

    if(socket.id === idsSocket[0]) // For just one store into DB
    {
        let lastIdGame = await getLastIdGame()

        const coDB = await DB()
        storeGame.map(e => {
            const req = new reqGame(coDB)
            e.idGame = lastIdGame + 1
            req.addLine(e)
        })
    }

    storeGame = []

    socket.to(room).emit('stopGame')
}

