

var express = require('express');

var mongoose = require("mongoose");
// mongodb://mongoservice:27017/mydb




// prod ------ important a conserver 
// const prod = "mongodb://mongo:27017/test";
// prod ------ important a conserver 

// local dslkfdsklf
const local = "mongodb://127.0.0.1/my_database";

// const prod = "mongodb://mongo:27017/test";





//dklfjldkfj
function DBconnection() {


    mongoose.connect(local, { useNewUrlParser: true, useUnifiedTopology: true })
    // Get the default connection
    const db = mongoose.connection;
    // console.log(db)
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('connected', function () {
        console.log('connected', "friends");
        console.log(mongoose.connection.readyState);

    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
    });


}


module.exports = { DBconnection }