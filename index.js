require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { mongoDbConnection } = require('./db/config');

//crear el servidor de express
const app = express();

//configurando middleware CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//base de datos
mongoDbConnection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));


//levantar
app.listen(process.env.PORT,() => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
});