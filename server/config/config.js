//process.env.= variables de configuracion en produccion.
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


//periodo de vencimiento token, 30 dias
//60segs
//60mints
//24hrs
//30dias
process.env.CADUCIDAD_TOKEN = '48h';

//seed, o secret del tolen 
process.env.SEED =process.env.SEED || 'seed-desarrollo' ;




