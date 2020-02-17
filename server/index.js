const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = express.Router()

const next = require('next')

const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroOptions = require('./admin')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const adminBro = new AdminBro(AdminBroOptions)

const adminRouter = AdminBroExpress.buildRouter(adminBro)

// TODO: install and configure express-session for usind auth in production build

// Uncomment next block code for admin auth
// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//   authenticate: async (email, password) => {
//     if (ADMIN.password === password && ADMIN.email === email) {
//       return ADMIN
//     }
//     return null
//   },
//   cookieName: 'adminbro',
//   cookiePassword: 'somepassword',
// })

const ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const ClothController = require('./controllers/cloth.controller')

app.prepare().then(() => {
  const server = express()

  // parse application/x-www-form-urlencoded
  server.use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  // parse application/json
  server.use(bodyParser.json())
  /**
   * Uncomment these lines if you need cross origin domain request.
   */
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

  // mongoose.connect('mongodb://localhost/test');
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Successfully connected to the database')
    })
    .catch(err => {
      console.log('Could not connect to the database. Exiting now...', err)
      process.exit()
    })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))

  server.use(adminBro.options.rootPath, adminRouter)

  server.get('/api/cloth', ClothController.findAll)

  server.post('/api/cloth', ClothController.create)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
