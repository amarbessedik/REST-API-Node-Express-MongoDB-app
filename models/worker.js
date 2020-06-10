const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
});

//MongoDB will pluralize the name of the collection: worker => workers
const Worker = mongoose.model('worker', WorkerSchema);

module.exports = Worker;