

var express = require('express');
const { route } = require('.');
var router = express.Router();
const jwt = require('jsonwebtoken')
const compare_password = require('../service/password_compare');
const updateUser = require('../service/updateUser');
const auth = require('../service/auth');
const axios = require("axios");

const sendEmail = require('../service/sendEmail');

const verifyEmail = require('../service/verifyEmail');

const cors = require('cors')
// const AuthUserMiddleware = require("../middleware/AuthUserMiddleware");
const user = require('../database/ShemaUser')
const bcrypt = require("bcrypt");
const { Admin } = require('mongodb');
//import User 
// ROUTE

//login

router.use(cors())
router.options('/', (req, res) => {
  res.status(200)
})

let token = ""

router.get('/accountVerify/:token', async (req, res) => {
  console.log(req.params.token)
  var verifyUser = await user.findOne({ access_token: req.params.token });
  if (verifyUser.verify === true) {
    return res.status(200).send("votre compte à déjà été vérifié");
  }
  if (verifyUser) {
    const filter = { access_token: req.params.token }
    const update = {
      verify: true
    }
    let doc = await user.findOneAndUpdate(filter, update);
  } else {
    return res.status(401).send("verification impossible, ce compte n'existe pas");
  }
  console.log(verifyUser)
  return res.send("votre compte à été vérifié avec success");
});

router.post('/verifyUser', sendEmail, (req, res ) => {
  return res.send("send")
  
});
router.post('/updateUser', auth, updateUser, (req, res) => {
  return res.send("updated")
});



router.post('/post', auth, async (req, res) => {
  console.log(req.body)

  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(403).send("token manquant");
  }
  let userToken = authHeader && authHeader.split(' ')[1]
  var postUser = await user.findOne({ access_token: userToken });

  if (postUser) {
    const filter = { access_token: req.params.token }
    const update = { userPost: { title: "sdklfj", description: "sdlkjfdlmskf" } }
    let doc = await user.findOneAndUpdate(filter, update);
    console.log(doc)
  }

  return res.status(200).send(postUser)
});

router.get('/resetPassword/:token', async (req, res) => {
  console.log(req.params.token)
  var verifyUser = await user.findOne({ access_token: req.params.token });
  if (verifyUser.verify === true) {
    return res.status(200).send("votre compte à déjà été vérifié");
  }
  if (verifyUser) {
    const filter = { access_token: req.params.token }
    const update = { verify: true }
    let doc = await user.findOneAndUpdate(filter, update);

  } else {
    return res.status(401).send("verification impossible, ce compte n'existe pas");
  }
  console.log(verifyUser)
  return res.send("account verified succesfully !");
});

// reset password
router.post('/resetPassword', async (req, res) => {
  if (!req) {
    return res.status(403).send({ error: "Une Erreur est survene" });
  }
  var verifyUser = await user.findOne({ email: req.body.data.email });
  if (verifyUser) {

    // envoyer email
    return res.send("reset password")
  }
  else {
    //service à appeler
    return res.status(403).send({ data: "Email doesn't exist" });
  }
});



// klsddklsfjmdlskfj
// register
router.post('/dashboard' , auth, (req, res) => {
  
  // update account

})

router.post('/register', cors({ origin: "*" }), async (req, res) => {

  if (req) {
    req
  } else {
    return res.status(401).send({ error: "Une Erreur est survene" });
  }
  var verifyUser = await user.findOne({ email: req.body.email });
  if (verifyUser) { 
    res.status(401).json({ data: "user already exist" });
  }

  else {
    //service à appeler
    const body = req.body;
    if (!body.email && !body.password) {
      return res.status(401).send({ error: "Data not formatted properly" });
    }
    // changer pour admin, à lier avec un token unique
    const role = "user";
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      access_token: "",
      role: role
    }
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '10m' });
    data.access_token = token;
    const User = new user(data);

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    User.password = await bcrypt.hash(User.password, salt);
    User.save().then((doc) => console.log(doc));

    res.status(200).json({ token: token, data :data});

  }
});

router.post("/login", compare_password, (req, res) => {

  res.send("logged in")

})





//logout



module.exports = router;
