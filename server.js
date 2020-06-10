const express = require('express');

//set up express app
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Server listening on port: ', PORT)
})
