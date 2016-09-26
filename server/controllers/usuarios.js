//File: controllers/usuarios.js
var mongoose = require('mongoose');  
var Usuario  = mongoose.model('Usuario');

//GET - Devuelve todos los usuarios de BD
exports.findAllUsuarios = function(req, res) {  
    Usuario.find(function(err, usuarios) {
    if(err) res.send(500, err.message);

    console.log('GET /usuarios')
        res.status(200).jsonp(usuarios);
    });
};

//GET - Devuelve un libro con un ID determinado
exports.findById = function(req, res) {  
    Usuario.findById(req.params.id, function(err, usuario) {
        if(err) return res.send(500, err.message);

        console.log('GET /usuario/' + req.params.id);
        res.status(200).jsonp(usuario);
    });
};

//POST - Inserta un Usuario en BD
exports.addUsuario = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var usuario = new Usuario({
        nombre          : req.body.nombre,
        apellidos       : req.body.apellidos,
        alias           : req.body.alias,
        usuario         : req.body.usuario,
        password        : req.body.password,
        email           : req.body.email,
        fechaNacimiento : req.body.fechaNacimiento,
        sexo            : req.body.sexo,
    });
    console.log('POST /usuarios ' + req.body.usuario);

    usuario.save(function(err, usuario) {
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(usuario);
    });
};

//POST - Comprueba las credenciales de un usuario
exports.authUsuario = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    Usuario.findOne({ usuario: req.body.usuario, password: req.body.password }, function(err, usuario) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(usuario);
    });

    console.log('POST /usuarios ' + req.body.usuario);

};

//PUT - Actualiza un libro existente
exports.updateUsuario = function(req, res) {  
    Usuario.findById(req.params.id, function(err, usuario) {
        console.log('POST /usuario/' + req.params.id);
        console.log(req.body);

        usuario.nombre      = req.body.nombre,
        usuario.apellidos   = req.body.apellidos,
        usuario.alias       = req.body.alias,
        usuario.usuario     = req.body.usuario,
        usuario.password    = req.body.password,
        usuario.email       = req.body.email,

        usuario.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    });
};

//DELETE - Elimina un usuario con un ID especificado
exports.deleteUsuario = function(req, res) {  
    Usuario.findById(req.params.id, function(err, usuario) {
        console.log('DELETE /usuario/' + req.params.id);
        usuario.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};