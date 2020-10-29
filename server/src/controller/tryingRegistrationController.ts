import { Socket } from "socket.io"
import database from '../connectDB'

interface User{
  userName: string
  password: string
}

export default (socket: Socket) => {

 return async (ID: User) => {
    console.log('In server socket.on("registation")')
    
    const db = await database()
    const verif: User = await db.get('SELECT * FROM Users WHERE userName=(?)', [ID.userName])
   if (verif)
   {
      console.log('Error user name is not available')
      socket.emit('userNameNotAvailable')
   }
   else
   {
      const request = 'INSERT INTO Users VALUES ((?),(?))'
      const result = await db.run(request, [ID.userName, ID.password])
      console.log('User stored');
   }
  }
}

