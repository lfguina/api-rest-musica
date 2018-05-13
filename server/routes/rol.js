let express = require('express')
const Rol = require('../models/rol');
const {verificarToken, verificarRol} = require('../middlewares/autenticacion');
let app = express()

//mostrar todas las roles
app.get('/rol', verificarToken, function (req, res) { 
    Rol.find({})
    .exec((err, rolesDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if
        res.json({
            ok:true,
            rols:rolesDB
        });

    });
        
});//fin del get

 
 //crear categoria, requiere token
 app.post('/rol', verificarToken, function (req, res) { 
    let body = req.body;
    let rol = new Rol({
        nombre:body.nombre
    });

    rol.save((err, rolDB)=>{
        //err de bdd
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        if (!rolDB) {
            return res.status(500).json({
                ok:false,
                err
            })
        };//fin del if

        res.json({
            ok:true,
            rol:rolDB
        });

    });
        
});//fin del get



  module.exports =app;