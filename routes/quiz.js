const express = require('express');
const router = express.Router();
const users = require('../data/users');
const valid = require('../data/validate');
const mongoCollections = require('../config/mongoCollections');
const usersMDB = mongoCollections.users;

router.get('/', async(req, res) => {
    res.render("quiz");
});


module.exports = router;