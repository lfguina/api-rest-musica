//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV||'dev';


//Bae de datos
let urlDB ;
if (process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/musica';
}else{
    urlDB='mongodb://admin:electronica10@ds119650.mlab.com:19650/musica';
}

process.env.URLDB=urlDB;

