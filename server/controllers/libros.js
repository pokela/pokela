//File: controllers/libros.js
var mongoose = require('mongoose');  
var Libro  = mongoose.model('Libro');

//GET - Devuelve todos los libros de BD
exports.findAllLibros = function(req, res) {  
    Libro.find(function(err, libros) {
    if(err) res.send(500, err.message);

    console.log('GET /libros')
        res.status(200).jsonp(libros);
    });
};

//GET - Devuelve un libro con un ID determinado
exports.findById = function(req, res) {  
    Libro.findById(req.params.id, function(err, libro) {
        if(err) return res.send(500, err.message);

        console.log('GET /libro/' + req.params.id);
        res.status(200).jsonp(libro);
    });
};

//POST - Inserta un libro en BD
exports.addLibro = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var libro = new Libro({
        _creador: req.body._creador,
        titulo:    req.body.titulo,
        subtitulo: req.body.subtitulo,
        descripcion:   req.body.descripcion,
        portada:     req.body.portada,
        capitulos       : req.body.capitulos,
        categorias       : req.body.categorias,
    });
    console.log('POST /libros ' + req.body.titulo);

    libro.save(function(err, libro) {
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(libro);
    });
};

//PUT - Actualiza un libro existente
exports.updateLibro = function(req, res) {  
    Libro.findById(req.params.id, function(err, libro) {
        console.log('POST /libro/' + req.params.id);
        console.log(req.body);

        libro.titulo   = req.body.titulo;
        libro.subtitulo= req.body.subtitulo;
        libro.descripcion  = req.body.descripcion;
        libro.portada    = req.body.portada;
        libro.capitulos = req.body.capitulos;
        libro.categorias = req.body.categorias,

        libro.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(libro);
        });
    });
};

//DELETE - Elimina un libro con un ID especificado
exports.deleteLibro = function(req, res) {  
    Libro.findById(req.params.id, function(err, libro) {
        console.log('DELETE /libro/' + req.params.id);
        libro.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};