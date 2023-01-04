const express = express("express")



const Update_token =   async (req, next ) => {
    const role = "user";
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      access_token: "",
      role: role

    }
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '30m' });
    data.access_token = token;

next()

}



module.exports = Update_token