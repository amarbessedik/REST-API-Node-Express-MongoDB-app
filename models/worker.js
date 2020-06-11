const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a GeoLocationSchema to add to WorkerSchema
const GeoLocationSchema = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates:{
        type:[Number],
        index: "2dsphere"
    }
});

//create worker Schema & model
const WorkerSchema = new Schema({
    name: {
        type: String,
        required:[true, 'Name field required']
    },
    rank:{
        type: String
    }, available:{
        type: Boolean,
        default: false
    },
    //add in geo-location
    geometry: GeoLocationSchema
});

//MongoDB will pluralize the name of the collection: worker => workers
const Worker = mongoose.model('worker', WorkerSchema);

module.exports = Worker;