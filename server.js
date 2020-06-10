const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

//set up express app
const app = express();

//use body-parser middleware
app.use(bodyParser.json());

//initialize routes
app.use('/api', routes);

//Start server to listen to requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server listening on port: ', PORT)
})
