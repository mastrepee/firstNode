const express = require('express');

const app = express()
const bodyParser = require("body-parser");

const news = require("./routes/news");
const AuthRoute = require('.routes/auth')

// middlewares
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//Database
const mongoose = require('mongoose');
mongoose
    .connect("mongodb+srv://mastre:Gloriously@clustrprac1.h8bc7zg.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("MongoDbConnected"))
    .catch((err) => console.log(err))


port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server is running at port: ' + 3000)
});


app.use("/news1", news);
app.use('/api', AuthRoute)
