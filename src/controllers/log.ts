import { Request, Response } from 'express'
import db from '../database/connectDataBase'
export default async (req: Request, res: Response) => {
  console.log("Dans post /log")
  const userName: string = req.body.userName
  const password: string = req.body.password
  const database = await db()
  const request1 = 'SELECT userName FROM User WHERE userName=(?) AND password=(?)'
  const result = await database.get(request1, [userName.toLowerCase(), password.toLowerCase()])
  console.log(result)
  if (result) {
    req.session.isAuthentificate = true
    req.session.currentUser = userName
    req.session.successMessage = "Vous êtes connecté !"
    const request2 = 'INSERT INTO userLog VALUES ((?))'
    database.run(request2, [userName])
    .catch((err: Error) => {
      if (err) console.log(err)
    })
    
  } 
  
  res.redirect('/')
}