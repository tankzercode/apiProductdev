
const express = require("express");
const user = require('../database/ShemaUser')
const jwt = require('jsonwebtoken')

const AuthUserMiddleware = async (req, res, next) => {

  next()

}


module.exports = AuthUserMiddleware