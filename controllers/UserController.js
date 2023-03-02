const User = require("../models/User")


class UserController{   


    async findUser(req, res) {
        var id = req.params.id

        var user = await User.findById(id)

        if(user == undefined) {
            res.json({})
            res.status(404)
        } else {
            res.status(200)
            res.json(user)
        }

    }

    async index(req, res) {
      var users = await User.findAll();
      res.json(users)
    }


    async create(req, res) {

        var {email, name, password} = req.body

        if(email == undefined) {
            res.status = 403
            res.json({erro: "E-mail inválido"})
            return

        }
        
            var emailExist = await User.findEmail(email)

            if(emailExist){
                res.status(406)
                res.json({erro: "E-mail já cadastrado"})
            }

            await User.new(email,password, name)
            
            
            res.status = 200
            res.json("tudo certo.") 

    }

    async edit(req, res) {
        var {id, name, role, email} = req.body

        var result = await User.update(id, email,name,role)

        if(result != undefined) {

            if(result.status) {
                res.status(200)
                res.send("Ok!")
            } else {
                res.status(406)
                res.send(result.erro)
            }
        } else {
            res.status(406)
            res.send("Ocorreu um erro no servidor!")
        }

    }

}

module.exports = new UserController()