class UserController{

    async create(req, res) {
        console.log(req.body)
       return res.send("Pegando o corpo da requisição")
    }

}

module.exports = new UserController()