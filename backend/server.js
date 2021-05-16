require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')
const method = require('method-override')

// Database settings
const conexion = require('./database')
conexion.on('error',console.error.bind(console,"Error de conexion MongoDB"))
conexion.once('open',()=>console.log("MongoDB conectado"))

// Template engine settings
const exphbs = require('express-handlebars')
app.engine('.hbs', exphbs({extname: '.hbs', 
  partialsDir: path.join(__dirname, 'views/partials/'),
  helpers: { json: function (context) { return JSON.stringify(context) }} 		
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Multer settings
const upload = require('./helpers/upload')
app.use(multer(upload).array('images'))

// Middlewares
app.use(cors())
app.use(cookieParser())
app.use(method('_method'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:true, limit: '50mb'}))

// Routes
app.use('/productos', require('./router/rtProduct'))
app.use('/admin', require('./router/rtAdmin'))
app.use('/usuario', require('./router/rtUser'))

// Error handler
app.use((req, res) => res.status(400).render('notfound', { title: 'Admin | 404', css: '404'}))

// Server
let port = process.env.PORT || 3000
app.listen(port, (err) => {
  if (err) console.log("Errores: ", err.message)
  console.log(`Servidor backend arrancado en ${port}`)
})