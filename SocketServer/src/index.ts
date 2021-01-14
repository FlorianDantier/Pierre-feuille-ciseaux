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
import showStatsController from "./controller/showStatsController"
import closeRoomController from "./closeRoomController"
import wantToJoinTournamentController from "./controller/wantToJoinTournamentController";
import startTournamentController from "./controller/startTournamentController";
import nextRoundController from "./controller/nextRoundController";

const io = socketio()

const sizeTournament = 4

let BotsRoom = new SetOfRoom(2, 1, 'Bots')
let UsersRoom = new SetOfRoom(10, 2, 'Users')
let TournamentRoom = new SetOfRoom(1, sizeTournament, 'Tournament')
let UserRoomForTournament = new SetOfRoom(sizeTournament / 2, 2, 'UserRoomForTournament')
let WinRoom = new SetOfRoom(1, 2, 'win')
let LooseRoom = new SetOfRoom(1, 2, 'loose')


io.on('connection', (socket: Socket | any) => {
  let sg : Game[] = [] // sg = store game

  console.log('A user has logged')
  socket.on('disconnect', disconnectController)

  socket.on('disconnecting', disconnectingController(BotsRoom, socket))

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(UsersRoom, io, socket))

  socket.on('wantToJoinTournament', wantToJoinTournamentController(TournamentRoom, socket, io))

  socket.on('StartTournament', startTournamentController(UserRoomForTournament, socket, io))

  socket.on('nextRound', nextRoundController(UserRoomForTournament, WinRoom, LooseRoom, socket, io))

  socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController(BotsRoom, socket))

  socket.on('PlayAgainstBot', playAgainstBotController(BotsRoom, socket, io))

  socket.on('haveChosen', haveChosenController(socket, sg))

  socket.on('gameFinished', gameFinishedController(socket, io, sg))

  socket.on('showStats', showStatsController(io, socket))

  socket.on('closeRoom', closeRoomController(UsersRoom, socket))
})

io.listen(8080)

console.log('listening on port : 8080')
