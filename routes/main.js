const express = require('express');
const router = express.Router();
const location = require('../data/location');

router.get('/', async (req, res) => {
    let allLocations = await location.getAllLocations();
    res.render('layouts/main', { locations: allLocations});
});


module.exports = router;