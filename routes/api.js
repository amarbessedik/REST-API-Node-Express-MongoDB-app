const express = require("express");
const router = express.Router();
const Worker = require("../models/worker");

//Handle HTTP requests

//get a list of workers from the database
router.get("/workers", (req, res, next) => {
  /*To find all records we the code bellow:
  Worker.find({}).then((workers)=>{
      res.send(workers);
  });*/
  //We want to get workers based on their geolocation
  Worker.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        spherical: true,
        maxDistance: 100000,
        distanceField: "dist.calculated",
      },
    },
  ]).then((results) => {
    res.send(results);
  });
});

router.post("/workers", (req, res, next) => {
  // var worker = new Worker(req.body);
  // worker.save();
  // in a similar way, we can create & save a worker record using the create method
  Worker.create(req.body)
    .then((worker) => {
      res.send(worker);
      //if error, fire next middleware
    })
    .catch(next);
});

router.put("/workers/:id", (req, res, next) => {
  Worker.findByIdAndUpdate(
    { _id: req.params.id, useFindAndModify: false },
    req.body
  ).then(() => {
    Worker.findOne({ _id: req.params.id }).then((worker) => {
      res.send({ status: "Record updated", data: worker });
    });
  });
});

router.delete("/workers/:id", (req, res, next) => {
  Worker.findByIdAndRemove({ _id: req.params.id, useFindAndModify: false })
    .then((worker) => {
      res.send({ msg: "Record deleted", data: worker });
    })
    .catch(next);
});

module.exports = router;
