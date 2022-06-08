const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locations');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(locationRoutes);

app.listen(process.env.PORT || PORT);

console.log(`Server running at PORT ${PORT}`);