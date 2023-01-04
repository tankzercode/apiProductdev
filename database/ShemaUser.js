
const { Admin } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShemaUser = new Schema({
    name:  String,
    email: String,
    password:  String,
    access_token: String,
    acces: String,
    role: String,
    verify: Boolean,
    emailVerify: Number,
    userPost : Object
    
});

const User = mongoose.model('users', ShemaUser);

module.exports = User;