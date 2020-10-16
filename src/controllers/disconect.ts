import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
  console.log('Tente de se déconecter....')
  req.session.destroy((err: Error) => {
    if(err)
    console.log(err.message)
  })
res.redirect('/')
}