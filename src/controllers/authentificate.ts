import {Response, Request} from 'express'

export default (req: Request, res: Response) => {
  if (req.session.isAuthentificate) {
    console.log('Authentificate :' ,req.session)
    res.render('connect')
  }
      
  else
  {
    console.log('Erreur pas authentifié !!!!')
    req.session.errorLog = "Vous devez être authentifié pour accéder à cette page !"
    res.redirect('/')
  }
      
}