const mongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongose.Schema;
let categoriaSchema = new Schema({
    nombre:{
        type:String,
        unique:true,
        required:[true, 'El nombre es necesario']
    },
    estado:{
        type:Boolean,
        default:true
    }
    
});
//categoriaSchema.plugin(uniqueValidator, { message:'{PATH} debe ser unicop'});

module.exports=mongose.model('Categoria', categoriaSchema);