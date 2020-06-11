const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to the database (mongoDB)
try {
    mongoose.connect("mongodb://localhost:27017/parteners", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
} catch (error) {
    console.log(error.message);
}
mongoose.Promise = global.Promise;

//use body-parser middleware (1st middleware)
app.use(bodyParser.json());

//initialize routes (2nd middleware)
app.use('/api', routes);

//error handling middleware (3rd middleware)
app.use((err, req, res, next) =>{
//    console.log(err.message);
   res.status(422).send({error: err.message});
});

//Start server to listen to requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server listening on port: ', PORT)
})
