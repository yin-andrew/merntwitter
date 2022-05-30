//new express server
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const passport = require('passport');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/tweets", tweets);

mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=>console.log("Connected to MongoDB successfully"))
    .catch(err=>console.log(err));
const port = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    console.log("here we are");
    res.send("Chicken nugets and fries")
});

app.listen(port, ()=> console.log(`server is running on port ${port}`));



