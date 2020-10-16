import { Request, Response } from 'express'
import database from '../database/connectDataBase'

export default async (req: Request, res: Response) => {
  console.log("Dans post /register")
  const userName: string = req.body.userName
  const password: string = req.body.password
  const verify = 'SELECT userName FROM User WHERE userName = (?)'
  const db = await database()
  const result = await db.get(verify, userName.toLowerCase());
  if (result === undefined) {
    const request = 'INSERT INTO User (userName, password) VALUES (?, ?)'
    await db.run(request, [userName.toLowerCase(), password.toLowerCase()])
    const successMessage = 'Utilsateur enregistré !'
    console.log(successMessage)
  } else {
    const errorMessage = 'Erreur : Déjà un utilsateur avec ce pseudo'
    req.session.errorMessage = errorMessage;
    console.log(errorMessage)
  } 
  
  res.redirect('/')
}