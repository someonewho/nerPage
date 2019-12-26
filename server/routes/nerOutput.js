const express = require('express');
const Output = require('../models/nerOutput');
const router = express.Router();

router.post('/get_output', (req, res) => {
    const id = req.body.input;
    Output.getOutput(id)
        .then((output) => {
            if(!output) {
                // 없을 경우
                return res.status(404).send({code: '404', error: 2})
            }
            else {
                res.send({output: output});
            }
        })
        .catch((err) => {
            res.status(500).send({code: '500', error: 3})
        })
})


module.exports = router
