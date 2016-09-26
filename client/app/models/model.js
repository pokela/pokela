function Libro() {
    this._id = "";
    this._creador = "";
    this.titulo = "";
    this.subtitulo = "";
    this.descripcion = "";
    this.portada = "";
    this.capitulos = [];
    this.categorias = [];
    this.valoraciones = [];
    this.etiquetas = [];
}

function Capitulo() {
    this._autor = "";
    this.titulo = "";
    this.subtitulo = "";
    this.descripcion = "";
    this.contenido = "";
    this.capitulos = [];
    this._categorias = [];
    this._valoraciones = [];
    this.etiquetas = [];
}

function Categoria() {
    this.descripcion = "";
}

function Valoracion() {
    this._usuario = "";
    this.valor = 0;
}

function ComentarioSchema() { 
    this._usuario = "";
    this.comentario = "";
}
  
function Usuario() {
    this._id = "";
    this.nombre = "";
    this.apellidos = "";
    this.alias = "";
    this.usuario = "";
    this.password = "";
    this.email = "";
    this.fechaNacimiento = null;
    this.sexo = "";
  /*this._biblioteca = "";*/
}

function BibliotecaSchema() {
    this.libros = "";
}