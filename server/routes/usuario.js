let express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
let app = express()
 

/*
    Obtener los usuarios por paginas, por defecto desde el registro 0, hasta un maximo de 5
    Parametros adminitods desde, limite
*/
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde=Number(desde);

    let limite = req.query.limite || 10;
    limite=Number(limite)
    Usuario.find({estado:true},'nombre email role estado img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarioBD)=>{
            if (err) {
                return res.status(400).json({
                    ok:false,
                    err
                });          
            }//fin del if el error
            Usuario.count({estado:true},(err, conteo)=>{
                res.json({
                    ok:true,
                    usuario:usuarioBD,
                    total:conteo
                });
            });
            

        });
    
})

/*
Metodo para solicitud post de un usuario, recibe los parametros dados en el modelo si todo esta correcto lo guarda en la BDD, caso contrario responde con status 400.
*/
app.post('/usuario', function (req, res) {
      let body = req.body;
      let usuario = new Usuario({
          nombre:body.nombre,
          apellido:body.apellido,
          email: body.email,
          password:bcrypt.hashSync(body.password,10),
          rol:body.rol
      });
      usuario.save((err, usuarioBD)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });          
        }//fin del if el error
        res.json({
            ok:true,
            usuario:usuarioBD
        });
      });
            
})
  /*
  Metodo para actualizar un registro de tipo usuario, recibe como parametro un id qu servira para buscarlo
  y a la postre actualizarlo
  */
  app.put('/usuario/:id', function (req, res) {
      let id = req.params.id;
      let body = _.pick(req.body, ['nombre', 'apellido','email', 'img','rol','estado']);
      Usuario.findByIdAndUpdate(id,body,{new:true, runValidators:true},(err,usuarioBD)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });          
        }//fin del if el error
        

        res.json({
            ok:true,
            usuario:usuarioBD
        })
      });
      
})
  
/*
    Metodo para eliminar un registro del tipo usuario, se necesita como parametro un id, para proceder
    a actualizar el campo estado a false, de tal manera que se mantenga la integridad referencial
*/
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id,(err, usuarioBD)=>{
    let updateEstado = {
        estado:false
    }
    Usuario.findByIdAndUpdate(id,updateEstado,{new:true},(err, usuarioBD)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });          
        }//fin del if el error

        if (!usuarioBD) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no encontrado'
                }
            });          
        }//fin del if para validar usuario vacio en eliminacion

        res.json({
            ok:true,
            usuario:usuarioBD
        })

    });
})

  module.exports =app;