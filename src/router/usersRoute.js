const router = require('express').Router()
const crypto = require("node:crypto")
const { user } = require('../middleware/db')
//Read
router.get("/get/:id?", async (req, res) => {
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
//Create
router.post("/create", async (req, res) => {
    const currentuser = {
        nom: req.body.nom ? req.body.nom : "",
        prenom: req.body.prenom ? req.body.prenom : "",
        email: req.body.email ? req.body.email : "",
        photo: req.body.photo ? req.body.photo : "",
        vehicules: req.body.vehicules ? new mongoose.Types.ObjectId(req.body.vehicules) : null,
        motDePasse: req.body.motDePasse ? crypto.createHash('sha256').update(req.body.motDePasse).digest("base64") : "",
        score: req.body.score ? req.body.score : "",
    }
    if(currentuser.nom.trim()=="" ||currentuser.prenom.trim()=="" || currentuser.email.trim()=="" ||currentuser.motDePasse.trim()=="" ||currentuser.score.trim()==""){
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
router.post("/:id/delete", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id.trim()==""){
        return res.send("missing id")
    }
    await user.findOneAndDelete({ _id: id });
    res.send(id)
})
//Update
router.post("/:id/update", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    const updateduser = {
        nom: req.body.nom ? req.body.nom : "",
        prenom: req.body.prenom ? req.body.prenom : "",
        email: req.body.email ? req.body.email : "",
        photo: req.body.photo ? req.body.photo : "",
        vehicules: req.body.vehicules ? new mongoose.Types.ObjectId(req.body.vehicules) : null,
        motDePasse: req.body.motDePasse ? req.body.motDePasse : "",
        score: req.body.score ? req.body.score : "",
    }
    if(currentuser.nom.trim()=="" ||currentuser.prenom.trim()=="" || currentuser.email.trim()=="" ||currentuser.motDePasse.trim()=="" ||currentuser.score.trim()==""){
        return res.send("incorrect format user")
    }
    await user.findOneAndUpdate({ _id: id }, updateduser);
    res.send(updateduser)
}) 

module.exports = router