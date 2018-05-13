let express = require('express')
const Categoria = require('../models/categoria');
const {verificarToken, verificarRol} = require('../middlewares/autenticacion');
let app = express()

//mostrar todas las categorias
app.get('/categoria', verificarToken, function (req, res) { 
    Categoria.find({})
    .exec((err, categoriasDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if
        res.json({
            ok:true,
            categorias:categoriasDB
        });

    });
        
});//fin del get

 //mostrar categoria por id
 app.get('/categoria/:id', verificarToken, function (req, res) { 
     let id = req.params.id;
    Categoria.findById(id , (err, categoriaDB)=>{
        //err de bdd
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        if (!categoriaDB) {
            return res.status(500).json({
                ok:false,
                err:{
                    message:'El id no es correcto'
                }
            })
        };//fin del if

        res.json({
            ok:true,
            categoria:categoriaDB
        });
    })
    
        
});//fin del get

 //crear categoria, requiere token
 app.post('/categoria', verificarToken, function (req, res) { 
    let body = req.body;
    let categoria = new Categoria({
        nombre:body.nombre
    });

    categoria.save((err, categoriaDB)=>{
        //err de bdd
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        if (!categoriaDB) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        res.json({
            ok:true,
            categoria:categoriaDB
        });

    });
        
});//fin del get

//Modificar categoria, requiere token
app.put('/categoria/:id', function (req, res) { 

    let id = req.params.id;
    let body = req.body;
    let newCategoria = {
        nombre:body.nombre
    }
    Categoria.findByIdAndUpdate(id, newCategoria,{new:true, runValidators:true}, (err, categoriaDB)=>{
        //err de bdd
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        if (!categoriaDB) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        res.json({
            ok:true,
            categoria:categoriaDB
        });
    });

    
        
});//fin del get

//Eliminar categoria, requiere token
//solo un admin puede borrar
app.delete('/categoria/:id', [verificarToken, verificarRol], function (req, res) { 
    let id = req.params.id;
    let updateEstado = {
        estado:false
    }

    Categoria.findByIdAndUpdate(id, updateEstado,{new:true},(err, categoriaDB)=>{
        //err de bdd
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        if (!categoriaDB) {
            return res.status(500).json({
                ok:false,
                err:{
                    message:'el id no existe'
                }
            })
        };//fin del if
        res.json({
            ok:true,
            categoria:categoriaDB,
            mensaje:'Categoria borrada'
        });


    });
    
        
});//fin del get


  module.exports =app;