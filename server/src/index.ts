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
import gameFinishedController from "./controller/gameFinishedController";
import connectDB from "./connectDB";


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
let UsersRoom = new SetOfRoom(10, 10)


var storeGame : Game[] = [] // Faire une classe pour gérer ça




io.on('connection', (socket: Socket) => {
  console.log('A user has logged')
  socket.on('disconnect', disconnectController) // Voir pour passer le tab en param puis suprimer l'id du socket si deco

  socket.on('disconnecting', disconnectingController(BotsRoom, socket))

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(UsersRoom, io, socket))
  
  socket.on('haveChosen', haveChosenController(socket, storeGame))

  socket.on('wantToPlayAgainstBot', wantToPlayAgainstBotController(BotsRoom, socket))

  socket.on('PlayAgainstBot', playAgainstBotController(BotsRoom, socket, io))

  socket.on('gameFinished', gameFinishedController(socket, io, storeGame))

  socket.on('showStats', async (currentUser) => {
    console.log('In show stats')
    if(socket.id === undefined) console.log('Error : No id on this socket !')
    const coDB = await connectDB()
    const result = await coDB.all('SELECT * FROM Game WHERE user1=(?) OR user2=(?)', [currentUser, currentUser])
    console.log(result)
    io.to(socket.id).emit('getStats', result)
    // Avant d'enregistrer : vérifier que l'on ai bien une partie fini (pas de déco ou autre coupure)
    // Gérer les match null
    // Quiter la page après partie fini
  })
})

io.listen(8080)


console.log('listening on port : 8080')
