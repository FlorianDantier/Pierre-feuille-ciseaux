import SocketIO, { Socket } from 'socket.io'
import database from '../connectDB'
import bcrypt from 'bcrypt'

interface User{
  userName: string
  password: string
}


export default (socket: Socket | any, io: SocketIO.Server) => async (ID: User) => {
    ID.userName = ID.userName.toLowerCase()
    console.log('In tryingConnection')
    const db = await database()
    const result: User = await db.get('SELECT * FROM Users WHERE userName=(?)', [ID.userName])
    
    if (result)
    {
      const same = await bcrypt.compare(ID.password, result.password)
      if(same)
      {
        const userName = result.userName
        socket.userName = userName
        console.log('Socket.username = ',socket.userName)
        console.log('Succesfull connection !')
        socket.emit('connected', userName)

      }
      else
      {
        console.log('Error userName or password')
      }
    }
    else
    {
      console.log('Error userName or password')
    }
}
