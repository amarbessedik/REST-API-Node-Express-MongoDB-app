const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to the database (mongoDB)
try {
    mongoose.connect("mongodb://localhost:27017/myapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
} catch (error) {
    console.log(error.message);
}
mongoose.Promise = global.Promise;

//use body-parser middleware
app.use(bodyParser.json());

//initialize routes
app.use('/api', routes);

//Start server to listen to requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server listening on port: ', PORT)
})
