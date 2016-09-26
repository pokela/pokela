var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var CategoriaSchema = new Schema({
    descripcion     : { type: String, required: true },
});

var ValoracionSchema = new Schema({
    _usuario        : { type: Schema.Types.ObjectId, required: true },
    valor           : { type: Number, required: true },
});

var CapituloSchema = new Schema({
    _autor          : { type: Schema.Types.ObjectId, required: true },
    titulo          : { type: String, required: true },
    subtitulo       : String,
    descripcion     : String,
    contenido       : String,
    capitulos      : [ CapituloSchema ],
    _categorias     : [ CategoriaSchema ],
    _valoraciones   : [ ValoracionSchema ],
    etiquetas       : [ String ],
});

var LibroSchema = new Schema({
    _creador        : { type: Schema.Types.ObjectId, required: true },
    titulo          : { type: String, required: true },
    subtitulo       : String,
    descripcion     : String,
    portada         : String,
    capitulos       : [ CapituloSchema ],
    categorias      : [ CategoriaSchema ],
    valoraciones    : [ ValoracionSchema ],
    etiquetas       : [ String ],
});



var ComentarioSchema = new Schema({
    _usuario        : { type: Schema.Types.ObjectId, required: true },
    comentario      : { type: String, required: true },
});
  
var UsuarioSchema = Schema({
  nombre            : String,
  apellidos         : String,
  alias             : String,
  usuario           : { type: String, required: true },
  password          : String,
  email             : String,
  fechaNacimiento   : Date,
  sexo              : String,
  /*_biblioteca       : { type: Schema.Types.ObjectId, required: true },*/
});

var BibliotecaSchema = new Schema({
    libros          : [ Schema.Types.ObjectId ]
});

module.exports = mongoose.model('Libro', LibroSchema); 
module.exports = mongoose.model('Capitulo', CapituloSchema);
module.exports = mongoose.model('Categoria', CategoriaSchema);
module.exports = mongoose.model('Valoracion', ValoracionSchema);
module.exports = mongoose.model('Comentario', ComentarioSchema);
module.exports = mongoose.model('Usuario', UsuarioSchema);
module.exports = mongoose.model('Biblioteca', BibliotecaSchema);
