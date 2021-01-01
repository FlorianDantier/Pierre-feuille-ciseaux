import socketio, {Socket} from 'socket.io'
import tryingRegistrationController from './controller/tryingRegistrationController'
import tryingConnectionController from './controller/tryingConnectionController'
import disconnectController from './controller/disconnetController'
import wantToPlayController from './controller/wantToPlayController'
import haveChosenController from "./controller/haveChoosedController"
import SetOfRoom from "./class/SetOfRoom"
import disconnectingController from "./controller/disconnectingController"
import wantToPlayAgainstBotController from "./controller/wantToPlayAgainstBotController"
import playAgainstBotController from "./controller/playAgainstBotController"
import Game from "./class/handleDataBase/Game"
import gameFinishedController from "./controller/gameFinishedController"
import connectDB from "./connectDB"
import showStatsController from "./controller/showStatsController"
import closeRoomController from "./closeRoomController"


enum Choice
{
  Pierre,
  Feuiile,
  Ciseaux
}

enum Strategy
{
  Strat1,
  Strat2,
  Random
}


const io = socketio()

let BotsRoom = new SetOfRoom(2, 1)
let UsersRoom = new SetOfRoom(10, 2)


io.on('connection', (socket: Socket) => {
  let sg : Game[] = []

  console.log('A user has logged')
  socket.on('disconnect', disconnectController)

  socket.on('disconnecting', disconnectingController(BotsRoom, socket))

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(UsersRoom, io, socket))

  socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController(BotsRoom, socket))

  socket.on('PlayAgainstBot', playAgainstBotController(BotsRoom, socket, io))

  socket.on('haveChosen', haveChosenController(socket, sg))

  socket.on('gameFinished', gameFinishedController(socket, io, sg))

  socket.on('showStats', showStatsController(io, socket))

  socket.on('closeRoom', closeRoomController(UsersRoom, socket))
})

io.listen(8080)

console.log('listening on port : 8080')
