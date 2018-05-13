const mongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongose.Schema;
let rolSchema = new Schema({
    nombre:{
        type:String,
        unique:true,
        required:[true, 'El nombre es necesario']
    },
    estado:{
        type:Boolean,
        default:true
    }
    
}, { collection: 'roles' });
//categoriaSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unicop'});

module.exports=mongose.model('Rol', rolSchema);