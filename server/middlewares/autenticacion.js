const jwt = require('jsonwebtoken');

//Verificar Token
let verificarToken = (req, res, next)=>{
    let token = req.get('token');
    jwt.verify(token,process.env.SEED, (err, decoded)=>{
        //si hay error en token
        if (err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:'Token incorrecto'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
   
};



//Veririficar Admin Rol
let verificarRol = (req, res, next)=>{

    let usuario = req.usuario;
    if (usuario.rol == 'admin_role'){
        next();
    }

    else{
        res.json({
            ok:false,
            err:{
                message:'Usario no es administrador'
            }
        });
    }




}


module.exports={
    verificarToken,
    verificarRol
}