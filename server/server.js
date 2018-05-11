require('./config/config');
let express = require('express')
let mongoose = require('mongoose');
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

 
mongoose.connect(process.env.URLDB, (err, res)=>{
    if (err) throw new Error;
    console.log("Conexion exitosa"); 
});


app.listen(process.env.PORT, ()=>{
    console.log("Escuchando",process.env.PORT);
})