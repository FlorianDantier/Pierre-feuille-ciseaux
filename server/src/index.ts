import socketio, { Socket } from 'socket.io'
import database from './connectDB'
import tryingRegistrationController from './controller/tryingRegistrationController'
import tryingConnectionController from './controller/tryingConnectionController'
import disconnectController from './controller/disconnetController'
import { log } from 'console'

const io = socketio()

interface User{
  userName: string
  password: string
}

interface idAndName{
  id: string,
  name: string
}

var tabUserWantPlay: idAndName[]  = []


io.on('connection', (socket: Socket) => {
  console.log('A user has logged')

  socket.on('disconnect', disconnectController) // Voir pour passer le tab en param puis suprimer l'id du socket si deco

  socket.on('tryingRegistration', tryingRegistrationController(socket))

  socket.on('tryingConnection', tryingConnectionController(socket, io))

  socket.on('wantToPlay', (username) => {
    console.log(username + ' want to play');
    tabUserWantPlay.push({
      id: socket.id,
      name: username
    })
    if (tabUserWantPlay.length >= 2)
    {
      console.log('Two user want play together !')
      
      //const otherUser = tabUserWantPlay.filter(e => e !== socket.id)[0]
      io.to(tabUserWantPlay[0].id).emit('readyToPlay', tabUserWantPlay[1])
      io.to(tabUserWantPlay[1].id).emit('readyToPlay', tabUserWantPlay[0])
      tabUserWantPlay = []
    }    
  })
  socket.on('haveChoosed', (partner: idAndName, value: string) => {
    //console.log('In haveChoosed')
    io.to(partner.id).emit('partnerHaveChoosed', value)
  })
})

io.listen(8080)


console.log('listening on port : 8080')
