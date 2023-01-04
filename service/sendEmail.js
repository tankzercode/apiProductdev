
const express = require('express');

// const User = require("../database/ShemaUser");
const axios = require("axios");

const sendEmail = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log("authheader" + authHeader)

    if (authHeader) {

    }
    else {
        return res.send("impossible de verifier le compte, token manquant");
    }
    let token = authHeader && authHeader.split(' ')[1]
    const params = {
        email: req.body.data.email,
        link: `http://localhost:8080/#/accountVerify/${token}`
    }
    const options = {
        method: 'POST',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '64c56753e6msh22ac3cd3b0d9787p139998jsn4ed2e1b09994',
            'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
        },
        data: {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": params.email
                        }
                    ],
                    "subject": "Hello, World!"
                }
            ],
            "from": {
                "email": "from_jake@myapp.com"
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": 'please verify your email now by clicking link \n' + params.link,
                }
            ]
        }
    };
    const requette = axios.request(options);
    console.log(requette)
    requette.then(response => {
        console.log(response)

        next()
    }).catch(error => {
        if (error) {
            return res.status(401).send("erreur verifier email")
        }
    });


}
module.exports = sendEmail
