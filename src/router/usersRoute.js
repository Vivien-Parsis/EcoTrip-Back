const userRouter = require('express').Router()
const crypto = require("node:crypto")
const { user } = require('../middleware/db')
//Read
userRouter.get("/get/:id?", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id){
        user.findOne({_id:id}).then((user)=>{
            res.send(user)
        })
    }else{
        user.find().then((users) => {
            res.send(users)
        })
    }
})
userRouter.post("/signin", async (req, res) => {
    const currentUser = {
        email: req.body.email ? req.body.email : "",
        motDePasse: req.body.motDePasse ? crypto.createHash('sha256').update(req.body.motDePasse).digest("base64") : ""
    }
    if(currentUser.email.trim()=="" || currentUser.motDePasse.trim()=="" ){
        return res.send("incorrect format user")
    }
    user.findOne({email:currentUser.email, motDePasse:currentUser.motDePasse}).then(
        data => {
            console.log(data)
            if(!data){
                return res.send({message:"user not found"})
            }
            return res.send(data)
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
        vehicules: req.body.vehicules ? new mongoose.Types.ObjectId(req.body.vehicules) : null,//facultatif
        score: 0
    }
    if(currentuser.nom.trim()=="" ||currentuser.prenom.trim()=="" || currentuser.email.trim()=="" ||currentuser.motDePasse.trim()=="" ){
        return res.send("incorrect format user")
    }
    user.find({email:req.body.email}).then((users)=>{
        if(users.length==0){
            user.insertMany([currentuser])
            res.send(currentuser)
        }else{
            res.send("already exist")
        }
    })
})
//Delete
userRouter.post("/delete/:id", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id.trim()==""){
        return res.send("missing id")
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
    user.findOne({ _id : id }).then(
        currentUser => {
            if(!currentUser){
                return res.send({ "message": "user not found" })
            }
            let UpdatedUser = {}
            UpdatedUser.nom = bodyData.nom ? bodyData.nom : currentUser.nom
            UpdatedUser.prenom = bodyData.prenom ? bodyData.prenom : currentUser.prenom
            UpdatedUser.email = bodyData.email ? bodyData.email : currentUser.email
            UpdatedUser.photo = bodyData.photo ? bodyData.photo : currentUser.photo
            UpdatedUser.vehicules = bodyData.vehicules ? bodyData.vehicules : currentUser.vehicules
            user.findOneAndUpdate({ _id: id }, {nom:UpdatedUser.nom, prenom:UpdatedUser.prenom, email:UpdatedUser.email, photo:UpdatedUser.photo, vehicules:UpdatedUser.vehicules}).then(
                data => {
                    if(!data){
                        return res.send({ "message": "user not found" })
                    }
                    return res.send(UpdatedUser)
                }
            )
        }
    )
}) 

module.exports = { userRouter }