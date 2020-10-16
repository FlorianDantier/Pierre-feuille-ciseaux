import express from "express"
import bodyParser from "body-parser"
import session from 'express-session'

/* ================= Controllers ================= */
import hompePageController from './controllers/homePage'
import logController from './controllers/log'
import registerController from './controllers/register'
import authentificateController from './controllers/authentificate'
import disconectController from './controllers/disconect'

const app = express()
// ================= MiddleWare ================= //
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'a key...',
  resave: true,
  saveUninitialized: true
}))

// ================= Routes ================= //
app.get('/', hompePageController)
app.get('/authentificate', authentificateController)
app.post('/log', logController)
app.post('/register', registerController)
app.get('/disconect', disconectController)

app.listen(8080)

