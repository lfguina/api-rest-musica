let express = require('express')
const Musica = require('../models/musica');
const {verificarToken, verificarRol} = require('../middlewares/autenticacion');
let app = express()

//Obtener musicas
app.get('/musica', verificarToken,(req, res)=>{
    //trae todas las musicas
    //populate : categoria
    //paginado
    let desde = req.query.desde || 0;
    desde= Number(desde);
    Musica.find({estado:true})
        .skip(desde)
        .limit(5)
        .populate('categoria','nombre')
        .exec((err, musicasDB)=>{
            if (err){
                return res.status(500).json({
                    ok:false, 
                    err
                });
            }//finde del if err

            res.json({
                ok:true,
                musicas:musicasDB
            });
        });


});

//buscar musicas
app.get('/musica/buscar/:termino', verificarToken,(req, res)=>{
    //trae todas las musicas
    //populate : categoria
    //paginado
    let termino = req.params.termino;
    //expresion regular
    let regex = new RegExp(termino, 'i');
    Musica.find({estado:true, nombre:regex})
        .populate('categoria','nombre')
        .exec((err, musicasDB)=>{
            if (err){
                return res.status(500).json({
                    ok:false, 
                    err
                });
            }//finde del if err

            res.json({
                ok:true,
                musicas:musicasDB
            });
        });


});

//obtener musica x id
app.get('/musica/:id', verificarToken,(req, res)=>{
    //trae todas las musicas
    //populate : categoria
    //paginado

    let id = req.params.id;
    Musica.findById(id)
        .populate('categoria','nombre')
        .exec((err, musicaDB)=>{
            if (err){
                return res.status(500).json({
                    ok:false, 
                    err
                });
            }//finde del if err

            if (!musicaDB){
                return res.status(400).json({
                    ok:false, 
                    err:{
                        message:'Id no existe'
                    }
                });
            }//finde del if err

            res.json({
                ok:true,
                musica:musicaDB

            });
    
            
    
        });
    });


//grabar musica
app.post('/musica',[verificarToken, verificarRol], (req, res)=>{
    //grabar la relacion con categoria

    let body = req.body;
    let musica = new Musica({
        nombre: body.nombre,
        img: body.img,
        url:body.url,
        duracion: body.duracion,
        estado:body.estado,
        categoria:body.categoria
    });

    musica.save((err, musicaDB)=>{
        if (err){
            return res.status(500).json({
                ok:false, 
                err
            });
        }//finde del if err

        res.json({
            ok:true,
            musica:musicaDB
        });
    });


});



//actualizar musica
app.put('/musica/:id', [verificarToken, verificarRol], (req, res)=>{
    //grabar la relacion con categoria

    let id = req.params.id;
    let body = req.body;
    //verificar si id exisste
    Musica.findById(id, (err, musicaDB)=>{
        if (err){
            return res.status(500).json({
                ok:false, 
                err
            });
        }//finde del if err

        if (!musicaDB){
            return res.status(400).json({
                ok:false, 
                err:{
                    message:'Musica no existe'
                }
            });
        }//finde del if err

        musicaDB.nombre= body.nombre,
        musicaDB.img= body.img,
        musicaDB.url=body.url,
        musicaDB.duracion= body.duracion,
        musicaDB.estado=body.estado,
        musicaDB.categoria=body.categoria

        musicaDB.save((err, musicaActualizada)=>{
            if (err){
                return res.status(500).json({
                    ok:false, 
                    err
                });
            }//finde del if err

            res.json({
                ok:true,
                musica:musicaActualizada
            });

        });
    });
    
});


//eliminar musica
app.delete('/musica/:id', (req, res)=>{
    let id= req.params.id;
    Musica.findById(id, (err, musicaDB)=>{
        if (err){
            return res.status(500).json({
                ok:false, 
                err
            });
        }//finde del if err

        if (err){
            return res.status(400).json({
                ok:false, 
                err:{
                    message:'Id no existe'
                }
            });
        }//finde del if err

        musicaDB.estado = false;

        musicaDB.save((err, musicaActualizada)=>{
            if (err){
                return res.status(500).json({
                    ok:false, 
                    err
                });
            }//finde del if err

            res.json({
                ok:true,
                musica:musicaActualizada,
                mensaje:'Musica borrada'
            });
        });

    })
    
});


module.exports =app;