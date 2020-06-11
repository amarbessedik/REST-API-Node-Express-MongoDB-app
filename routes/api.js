const express = require('express');
const router = express.Router();
const Worker = require('../models/worker')

//Handle HTTP requests

//get a list of workers from the database
router.get('/workers', (req, res, next) => {
    res.send({
        message: 'You sent a GET request'
    })
});

router.post('/workers', (req, res, next) => {
    // var worker = new Worker(req.body);
    // worker.save();
    // in a similar way, we can create & save a worker record using the create method
    Worker.create(req.body).then((worker)=>{
        res.send(worker);
        //if error, fire next middleware
    }).catch(next);
});

router.put('/workers/:id', (req, res, next) => {
    res.send({
        message: 'You sent a PUT request'
    })
});

router.delete('/workers/:id', (req, res, next) => {
    res.send({
        message: 'You sent a DELETE request'
    })
});

module.exports = router;