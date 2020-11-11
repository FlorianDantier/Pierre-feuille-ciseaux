import socketio, { Socket } from 'socket.io'
import database from './connectDB'
import tryingRegistrationController from './controller/tryingRegistrationController'
import tryingConnectionController from './controller/tryingConnectionController'
import disconnectController from './controller/disconnetController'
import wantToPlayController from './controller/wantToPlayController'
import haveChoosedController from "./controller/haveChoosedController";

const io = socketio()

io.on('connection', (socket: Socket) => {
  console.log('A user has logged')

  socket.on('disconnect', disconnectController) // Voir pour passer le tab en param puis suprimer l'id du socket si deco

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', wantToPlayController(io, socket))
  
  socket.on('haveChoosed', haveChoosedController(socket))

  socket.on('wantToPlayAgainstBot', () => {
    console.log('In wantToPlayAgainstBot ...')
  })
})

io.listen(8080)


console.log('listening on port : 8080')
