var express = require("express"),  
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
app.put('/', function(req, res, next) {
 // Handle the post for this route
});

var router = express.Router();

router.get('/', function(req, res) {  
   res.send("Hello World from Server!");
});

app.use(router);

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/libros', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(4000, function() {  
    console.log("Node server ejecutándose en http://localhost:4000");
    });
});

require('./models/libro');

var LibroCtrl = require('./controllers/libros');
var UsuarioCtrl = require('./controllers/usuarios');
var CategoriaCtrl = require('./controllers/categorias');

// API routes
var libros = express.Router();
var usuarios = express.Router();
var categorias = express.Router();

usuarios.route('/usuarios')  
  .get(UsuarioCtrl.findAllUsuarios)
  .post(UsuarioCtrl.addUsuario);

usuarios.route('/usuarios/autentificacion')  
  .post(UsuarioCtrl.authUsuario);

libros.route('/libros')  
  .get(LibroCtrl.findAllLibros)
  .post(LibroCtrl.addLibro);

libros.route('/libros/:id')  
  .get(LibroCtrl.findById)
  .post(LibroCtrl.updateLibro)
  .delete(LibroCtrl.deleteLibro)

libros.route('/eliminar-libro/:id')  
  .get(LibroCtrl.deleteLibro)

categorias.route('/categorias')  
  .get(CategoriaCtrl.findAllCategorias)
  .post(CategoriaCtrl.addCategoria);

categorias.route('/categorias/:id')  
  .get(CategoriaCtrl.findById)
  .post(CategoriaCtrl.updateCategoria)
  .delete(CategoriaCtrl.deleteCategoria)

categorias.route('/eliminar-categoria/:id')  
  .get(CategoriaCtrl.deleteCategoria)

app.use('/api', libros);
app.use('/api', usuarios);
app.use('/api', categorias);