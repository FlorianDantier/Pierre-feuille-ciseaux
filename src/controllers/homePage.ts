import { defaults } from "pg";

import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  if (req.session.errorMessage)
  {
    res.locals.errorMessage = req.session.errorMessage
    req.session.errorMessage = undefined
  }
  if (req.session.errorLog)
  {
    res.locals.errorLog = req.session.errorLog
    req.session.errorLog = undefined
  }
  if (req.session.successMessage)
  {
    res.locals.successMessage = req.session.successMessage
    req.session.successMessage = undefined
  }
  if (req.session.isAuthentificate) {
    res.locals.user = req.session.currentUser
    console.log("user : ",res.locals.user)
  }
  res.render('index')
}

