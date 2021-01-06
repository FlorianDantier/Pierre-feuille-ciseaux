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

const sizeTournament = 4

let BotsRoom = new SetOfRoom(2, 1, 'Bots')
let UsersRoom = new SetOfRoom(10, 2, 'Users')
let TournamentRoom = new SetOfRoom(1, sizeTournament, 'Tournament')
let UserRoomForTournament = new SetOfRoom(sizeTournament / 2, 2, 'UserRoomForTournament')
let WinRoom = new SetOfRoom(1, 2, 'win')
let LooseRoom = new SetOfRoom(1, 2, 'loose')


io.on('connection', (socket: Socket | any) => {
  let sg : Game[] = []

  console.log('A user has logged')
  socket.on('disconnect', disconnectController)

  socket.on('disconnecting', disconnectingController(BotsRoom, socket))

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(UsersRoom, io, socket))

  socket.on('seeRooms', () => {
    console.log('Salon rejoint : ', Object.keys(socket.rooms))
  })


  socket.on('wantToJoinTournament', () => {
    console.log('In want to join tournament')
    const currentRoom = TournamentRoom.add(socket)
    console.log('Value\'s CurrentRoom : ',currentRoom)
    if(currentRoom)
    {
      if(!TournamentRoom.getRoom(currentRoom).isFree())
      {
        io.to(currentRoom).emit('MidStartTournament')
      }
    }
  })

  socket.on('StartTournament', () => {
    console.log('In start tournament ... ')
    const currentRoom = UserRoomForTournament.add(socket)
    if(currentRoom)
    {
      if(!UserRoomForTournament.getRoom(currentRoom).isFree())
      {
        io.to(currentRoom).emit('readyToPlay', currentRoom)
      }
    }
  })

  socket.on('nextRound', (isWin: boolean) => {
    console.log('In nextRound event : ')
    UserRoomForTournament.remove(socket)
    socket.leave('UserRoomForTournament0')
    console.log(socket.rooms)
    if(isWin)
    {
       const currentRoom =  WinRoom.add(socket)
        if(currentRoom)
        {
          if(!WinRoom.getRoom(currentRoom).isFree())
          {
            console.log('Dans win, ready to play emit ....')
            io.to(currentRoom).emit('readyToPlay', currentRoom)
          }
        }
    }
    else
    {
      const currentRoom = LooseRoom.add(socket)
      if(currentRoom)
      {
        if(!LooseRoom.getRoom(currentRoom).isFree())
        {
          console.log('Dans loose, ready to play emit ....')
          io.to(currentRoom).emit('readyToPlay', currentRoom)
        }
      }
    }
  })

  socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController(BotsRoom, socket))

  socket.on('PlayAgainstBot', playAgainstBotController(BotsRoom, socket, io))

  socket.on('haveChosen', haveChosenController(socket, sg))

  socket.on('gameFinished', gameFinishedController(socket, io, sg))

  socket.on('showStats', showStatsController(io, socket))

  socket.on('closeRoom', closeRoomController(UsersRoom, socket))
})

io.listen(8080)

console.log('listening on port : 8080')
