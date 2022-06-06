const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locations');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // esto diciendo que voy a permitir solicitudes desde todos los servidores

    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // acepto solo entradas con los metodos definidos

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // acepto los headers que tienen el tipo de contenido Content-Type
    next();
});

app.use(locationRoutes);

app.listen(process.env.PORT || PORT);

console.log(`Server running at PORT ${PORT}`);