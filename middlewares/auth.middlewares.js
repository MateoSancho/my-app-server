const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

    console.log(req.headers)

    try {
        const authToken = req.headers.authorization.split(" ")[1]
       
        const payload = jwt.verify(authToken, process.env.TOKEN_SECRET)
        //console.log(payload)

        req.payload = payload // passing the extracted payload info into the user making the request to the route
       
        next() //continue to the route
    } catch (error) {
        //if the token is not valid then it goes into this catch
        res.status(401).json({errorMessage: "token not vaild"})
    }

    


}

module.exports = verifyToken