import socketio, { Socket } from 'socket.io'
import tryingRegistrationController from './controller/tryingRegistrationController'
import tryingConnectionController from './controller/tryingConnectionController'
import disconnectController from './controller/disconnetController'
import wantToPlayController from './controller/wantToPlayController'
import haveChosenController from "./controller/haveChoosedController"
import SetOfRoom from "./class/SetOfRoom";
import disconnectingController from "./controller/disconnectingController";
import wantToPlayAgainstBotController from "./controller/wantToPlayAgainstBotController";
import playAgainstBotController from "./controller/playAgainstBotController";


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
var globalRoomBot = 1000

io.on('connection', (socket: Socket) => {
  console.log('A user has logged')

  socket.on('disconnect', disconnectController) // Voir pour passer le tab en param puis suprimer l'id du socket si deco

  socket.on('disconnecting', disconnectingController(BotsRoom, socket))

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(io, socket))
  
  socket.on('haveChosen', haveChosenController(socket))

  socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController(BotsRoom, socket))

  socket.on('PlayAgainstBot', playAgainstBotController(BotsRoom, socket, io))
})

io.listen(8080)


console.log('listening on port : 8080')
