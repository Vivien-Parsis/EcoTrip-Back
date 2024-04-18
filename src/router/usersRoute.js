const userRouter = require('express').Router()
const crypto = require("node:crypto")
const { user } = require('../middleware/db')
const { isValidEmail, validatePassword } = require('../controller/validator')
//Read
userRouter.get("/get/:id?", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if (id) {
        await user.findOne({ _id: id }).then((user) => {
            res.send(user)
        })
    } else {
        await user.find().then((users) => {
            res.send(users)
        })
    }
})
userRouter.post("/signin", async (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        motDePasse: req.body.motDePasse ? crypto.createHash('sha256').update(req.body.motDePasse).digest("base64") : ""
    }
    if (currentUser.email.trim() == "" || currentUser.motDePasse.trim() == "") {
        return res.status(400).send({ message: "incorrect format user" })
    }
    user.findOne({ email: currentUser.email, motDePasse: currentUser.motDePasse }).then(
        data => {
            if (!data) {    
                return res.status(400).send({ message: "user not found" })
            }
            return res.send(data)
        }
    )
})
userRouter.post("/car/add", async (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        motDePasse: req.body.motDePasse ? crypto.createHash('sha256').update(req.body.motDePasse).digest("base64") : "",
        car : req.body.car ? req.body.car : "",
    }
    if (currentUser.email.trim() == "" || currentUser.motDePasse.trim() == "" || currentUser.car.trim()=="") {
        return res.status(400).send({ message: "incorrect format user" })
    }
    user.findOne({ email: currentUser.email, motDePasse: currentUser.motDePasse }).then(
        conducteur => {
            if (!conducteur) {    
                return res.status(400).send({ message: "user not found" })
            }
            car.findOne({ _id : currentUser.car }).then(
                voiture => {
                    if(!voiture){
                        return res.status(400).send({ message: "car not found" })
                    }
                    user.findOneAndUpdate({ _id : conducteur._id }, { vehicules : currentUser.car }).then(
                        data => {
                            if (!data) {    
                                return res.status(400).send({ message: "user not found" })
                            }
                            return res.send(data)
                        }
                    )
                }
            )
            
        }
    )
})
//Create
userRouter.post("/signup", async (req, res) => {
    const currentuser = {
        nom: req.body.nom ? req.body.nom : "",//obligatoire
        prenom: req.body.prenom ? req.body.prenom : "",//obligatoire
        email: req.body.email ? req.body.email : "",//obligatoire
        motDePasse: req.body.motDePasse ? crypto.createHash('sha256').update(req.body.motDePasse).digest("base64") : "",//obligatoire
        photo: req.body.photo ? req.body.photo : "",//facultatif
        vehicules: null,
        score: 0
    }
    if (currentuser.nom.trim() == "" || currentuser.prenom.trim() == "" || currentuser.email.trim() == "" || currentuser.motDePasse.trim() == "") {
        return res.status(400).send("incorrect format user")
    }
    if (!isValidEmail(currentuser.email)) {
        return res.status(400).send({ message: "incorrect mail format" })
    }
    if (validatePassword(req.body.motDePasse) != null) {
        return res.status(400).send({ message: validatePassword(req.body.motDePasse) })
    }
    await user.find({ email: req.body.email }).then((users) => {
        if (users.length == 0) {
            user.insertMany([currentuser])
            res.send(currentuser)
        } else {
            res.status(400).send("already exist")
        }
    })
})
//Delete
userRouter.post("/delete/:id", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if (id.trim() == "") {
        return res.status(400).send("missing id")
    }
    await user.findOneAndDelete({ _id: id });
    res.send(id)
})
//Update
userRouter.post("/update/:id", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    const bodyData = {
        nom: req.body.nom ? req.body.nom : "",
        prenom: req.body.prenom ? req.body.prenom : "",
        email: req.body.email ? req.body.email : "",
        photo: req.body.photo ? req.body.photo : "",
        vehicules: req.body.vehicules ? req.body.vehicules : ""
    }
    user.findOne({ _id: id }).then(
        currentUser => {
            if (!currentUser) {
                return res.status(400).send({ "message": "user not found" })
            }
            let UpdatedUser = {
                nom: bodyData.nom ? bodyData.nom : currentUser.nom,
                prenom: bodyData.prenom ? bodyData.prenom : currentUser.prenom,
                email: bodyData.email ? bodyData.email : currentUser.email,
                photo: bodyData.photo ? bodyData.photo : currentUser.photo,
                vehicules: bodyData.vehicules ? bodyData.vehicules : currentUser.vehicules
            }
            user.findOneAndUpdate({ _id: id }, { nom: UpdatedUser.nom, prenom: UpdatedUser.prenom, email: UpdatedUser.email, photo: UpdatedUser.photo, vehicules: UpdatedUser.vehicules }).then(
                data => {
                    if (!data) {
                        return res.status(400).send({ "message": "user not found" })
                    }
                    return res.send(UpdatedUser)
                }
            )
        }
    )
})

module.exports = { userRouter }