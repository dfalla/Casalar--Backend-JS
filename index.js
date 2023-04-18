const dotenv = require('dotenv');
// const path = require('path');
const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const AUTH = require('./routes/auth');
const PRODUCTS = require('./routes/products');
const { databaseConnection } = require('./database/databaseConfig');
dotenv.config();

//Crear el servidor de express
const app = express();

const apiPaths = {
    auth: '/api/auth',
    productos: '/api/productos'
}

//Carga de archivos
app.use(fileUpload({
    useTempFiles: true, // cuando se suba la imagen, que no lo mantenga en memoria, sino que lo guarde en una carpeta
    tempFileDir: './upload',
    // limits: { fileSize: 50 * 1024 * 1024 }
}));

//Base de datos
databaseConnection();

//CORS
app.use( cors() );


//Directorio Público
// app.use(express.static(path.join(__dirname, 'app/upload')));

app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


//Rutas

//TODO: auth // crear, login, renew
app.use( apiPaths.auth, AUTH );

//Ruta de alumnos
app.use( apiPaths.productos, PRODUCTS );
//TODO: CRUD: eventos

app.use('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Escuchar peticiones

const PORT = process.env.PORT || 4001;

app.listen( PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ PORT }`);
} );