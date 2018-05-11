const mongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos={
    values:['admin_role', 'user_role'],
    message:'{VALUE} no es un rol valido'
}
let Schema = mongose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es necesario']
    },
    apellido:{
        type:String,
        required:[true, 'El apellido es necesario']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'El email es necesario']
    },
    password:{
        type:String,
        required:[true, 'El password  es necesario']
    },
    img:{
        type:String,
        required:false
    },
    rol:{
        type:String,
        //default:'user_role',
        required:[true, 'El rol  es necesario'],
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    }
    
});
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
usuarioSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unico'});
module.exports=mongose.model('Usuario', usuarioSchema);