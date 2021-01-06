import {Socket} from "socket.io"
import Game from "../class/handleDataBase/Game"
import reqGame from "../class/handleDataBase/reqGame"
import connectDB from "../connectDB";

export default  (socket: Socket | any, storeGame: Game[]) => async (room: string, value: string) => {
        console.log('In haveChoosed')
        console.log('Value room : ', room)

        let lastIdGame = undefined
        if(storeGame.length === 0)
        {
                const coDB = await connectDB()
                const rg = new reqGame(coDB)
                lastIdGame = await rg.getLastIdGame()
        }

        console.log('Value lastIdGame : ', lastIdGame)
        storeGame.push(new Game({
                choice: value,
                user: socket.userName,
                idManche: storeGame.length,
                idGame: lastIdGame !== undefined ? lastIdGame + 1 : storeGame[0].idGame
        }))
        //console.log('content of storegame : ', storeGame)
        socket.to(room).emit('partnerHaveChosen', value)
}

