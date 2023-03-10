const jwt = require('jsonwebtoken')


module.exports = function(req, res, next) {
    

    var secret = "apperture"

    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]

        try{
            var decoded = jwt.verify(token,secret)

            if(decoded.role == 1){
                next()
            }else {
                res.status(403)
            res.send("Não autorizado.")
            return
            }

        }catch(error) {
            res.status(403)
            res.send("Não autorizado.")
            return
        }

    } else {
        res.status(403)
        res.send("Não autorizado.")
        return
    }


}