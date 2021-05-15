const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');

router.get('/', async(req, res) => {
    res.render("quiz");
});


module.exports = router;