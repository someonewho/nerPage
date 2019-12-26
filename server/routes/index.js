const express = require('express');
// const mongoose = require('mongoose');

const router = express.Router();

/* Implements API Methods */
router.get('/', (req, res) => res.json({data:'this is index.'}));


module.exports = router