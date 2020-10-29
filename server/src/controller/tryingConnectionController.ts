import { Socket } from 'socket.io'
import database from '../connectDB'

interface User{
  userName: string
  password: string
}

export default (socket: Socket, io: SocketIO.Server) => {
  return async (ID: User) => {
    console.log('Dans tryingConnection')
    const db = await database()
    const result: User = await db.get('SELECT * FROM Users WHERE userName=(?) AND password=(?)', [ID.userName, ID.password])
    
    if (result)
    {
      const userName = result.userName
      console.log('Succesfull connection !')
      socket.emit('connected', userName)
    }
    else
    {
      console.log('Error userName or password')
    }
  }
}