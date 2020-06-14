const express = require("express");
const router = express.Router();
const Bank = require("../models/bank");

//Handle HTTP requests

//get a list of banks from the database
router.get("/banks", (req, res, next) => {
  /*To find all records we the code bellow:
  Bank.find({}).then((banks)=>{
      res.send(banks);
  });*/
  //We want to get banks based on their geolocation
  Bank.aggregate([
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
  }).catch(next);
});

router.post("/banks", (req, res, next) => {
  // var Bank = new Bank(req.body);
  // Bank.save();
  // in a similar way, we can create & save a Bank record using the create method
  Bank.create(req.body)
    .then((Bank) => {
      res.send(Bank);
      //if error, fire next middleware
    })
    .catch(next);
});

router.put("/banks/:id", (req, res, next) => {
  Bank.findByIdAndUpdate(
    { _id: req.params.id, useFindAndModify: false },
    req.body
  ).then(() => {
    Bank.findOne({ _id: req.params.id }).then((Bank) => {
      res.send({ status: "Record updated", data: Bank });
    });
  }).catch(next);
});

router.delete("/banks/:id", (req, res, next) => {
  Bank.findByIdAndRemove({ _id: req.params.id, useFindAndModify: false })
    .then((Bank) => {
      res.send({ msg: "Record deleted", data: Bank });
    })
    .catch(next);
});

module.exports = router;
