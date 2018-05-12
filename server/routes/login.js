let express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
let app = express();

/*
Metodo para realizar login, recibe los parametros dados en el modelo si todo esta correcto status 200 caso contrario responde con status 400.
*/
app.post('/login', function (req, res) {


    

    let body = req.body;
    Usuario.findOne({email:body.email}, (err, usuarioDB)=>{

        if (err) {
            return res.status(400).json({
                ok:false,
                err
            });          
        }//fin del if el error

        //si no existe error (usuario)
        if (!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario o password incorrectos"
                }
            });    
        }
        //password incorrecto
        if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario o password incorrectos"
                }
            }); 
        }

        let token = jwt.sign({
            usuario: usuarioDB
          }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok:true,
            usuario:usuarioDB,
            token:token
    
        });
        



    });
    
          
})








module.exports =app;
