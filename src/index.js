const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose=require("mongoose")
const app = express();

app.use(bodyParser.json());


//connecting to database
mongoose.connect("mongodb+srv://khushboobabil12:khushboo12345@cluster0.j9hng.mongodb.net/scogo", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);


//listen to this server
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
