import { Socket } from "socket.io"
import database from '../connectDB'
import bcrypt from 'bcrypt'

const saltRounds = 10;

interface User{
  userName: string
  password: string
}

export default (socket: Socket) => async (ID: User) => {
    console.log('In SocketServer socket.on("registation")')
    ID.userName = ID.userName.toLowerCase()
    const db = await database()
    const verify: User = await db.get('SELECT * FROM Users WHERE userName=(?)', [ID.userName])
   if (verify)
   {
      console.log('Error user name is not available')
      socket.emit('userNameNotAvailable')
   }
   else
   {
      const passwordHash = await bcrypt.hash(ID.password, saltRounds)
      const request = 'INSERT INTO Users VALUES ((?),(?))'
      await db.run(request, [ID.userName, passwordHash])
      console.log('User stored');
   }
}

