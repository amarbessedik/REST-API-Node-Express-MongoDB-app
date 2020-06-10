const express = require('express');
const router = express.Router();

//Handle HTTP requests

//get a list of workers from the database
router.get('/workers', (req, res) => {
    res.send({
        message: 'You sent a GET request'
    })
});

router.post('/workers', (req, res) => {
    const response = req.body;
    res.send({
        message: response,
        status: 'Sent back from server!'
    })
});

router.put('/workers/:id', (req, res) => {
    res.send({
        message: 'You sent a PUT request'
    })
});

router.delete('/workers/:id', (req, res) => {
    res.send({
        message: 'You sent a DELETE request'
    })
});

module.exports = router;