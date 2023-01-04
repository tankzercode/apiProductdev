
const express = require('express');
const User = require("../database/ShemaUser");
const updateUser = async (req, res, next) => {

    if (req) {
        req
    } else {
        return res.status(403).send({ error: "Une erreur est survenue" });
    }

    var look = await User.findOne({ email: req.body.updateEmail })
    // console.log("fin user" + look)
    if (look) {
        return res.status(401).send("email already Exist")
    }
    else {
        const filter = { email: req.body.email }
        const update = {
            email: req.body.updateEmail,
            name: req.body.updateName,
            verify: false
        }
        async function update_user() {
            let doc = await User.findOneAndUpdate(filter, update);
        }
        update_user()
        next()

    }
}

module.exports = updateUser