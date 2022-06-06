const express = require('express');
const router = express.Router(); // metodo que facilita el trabajo con las rutas

const locationStorage = {
    location: [
        {
            id: 259,
            address: 'San Bernardo Street',
            coords: { lat: 22222222222, lng: 3333333333 },
        },
    ],
};

router.post('/add-location', (req, res, next) => {
    // esto funciona como un middleware que se ejecuta cuando viene un pedido con un metodo post a add-location

    // guardamos en un arreglo los datos que el cliente me pasa desde la url en formato JSON
    const id = Math.random();

    locationStorage.location.push({
        id: id,
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng },
    });
    console.log(locationStorage);

    // enviamos una respuesta al cliente para que sepa que fueron procesados los datos
    res.json({ messagge: 'Stored locations!', locId: id });
});
router.get('/location/:lid', (req, res, next) => {
    // el segmento :lid le dice a expres que hasta los dos punto esta aplicado el filtro. Luego de uso se guarda el valor con el identificador lid en el req
    console.log(locationStorage.location);
    const locationId = +req.params.lid;
    const location = locationStorage.location.find((loc) => {
        return loc.id === locationId;
    });
    if (!location) {
        res.status(404).json({ message: 'Not found!!' });
    }
    res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
