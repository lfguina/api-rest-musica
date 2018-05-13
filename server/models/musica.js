var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var musicaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: [true, 'Img es necesario'] },
    url:{ type: String, required: [true, 'Url es necesario'] },
    duracion:{ type: Number, required: [true, 'Duracion es necesario'] },
    estado: { type: Boolean, required: true, default: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
});


module.exports = mongoose.model('Musica', musicaSchema);