
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    console.log("ma requette d'authenticifatin \n")
    if (req) {
        req
    } else {
        return res.status(403).send({ error: "pas de data" });
    }
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, checkuser) => {
            console.log(checkuser)
            if (err) {
                if (err) {
                    console.log(err)
                    return res.status(403).send("invalid token")
                }
                console.log(err)
                return res.status(403).send("token doesn't match")
            }
            return res.status(200).json(checkuser)

        })
    }
}
module.exports = auth;

