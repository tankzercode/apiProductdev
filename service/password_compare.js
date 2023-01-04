
const express = require('express')
const jwt = require('jsonwebtoken')

const User = require("../database/ShemaUser")

const bcrypt = require('bcrypt');
const compare_password = async (req, res, next) => {
    const look = await User.findOne({ email: req.body.email })
    console.log(look)
    if (look) {
        bcrypt.compare(req.body.password, look.password, function (err, bool) {
            if (err) {
                return res.status(401).send("invalid cred")
            }

            else if (bool === false) {
                return res.status(401).send("invalid password")
            }

            else {
                // refresh tocken
                const role = "user";
                const data = {
                    email: req.body.email,
                    password: req.body.password,
                    access_token: "",
                    role: role,
                    // mail: "TOKEN" 
                }
                const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '10m' });
                console.log("\n tocken sign : \n" + token)

                data.access_token = token;

                const filter = { email: req.body.email }
                const update = { access_token: token }
                async function update_user() {
                    let doc = await User.findOneAndUpdate(filter, update);

                }
                update_user()
                res.end(token);
            }
        })

    }

    else {
        return res.status(401).send("User Not Found")

    }



}



module.exports = compare_password