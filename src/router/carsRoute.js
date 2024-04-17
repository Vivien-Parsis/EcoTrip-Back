const carsRouter = require('express').Router()
const { car } = require('../middleware/db')
//Read
carsRouter.get("/get/:id?", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id){
        car.findOne({_id:id}).then((car)=>{
            res.send(car)
        })
    }else{
        car.find().then((cars) => {
            res.send(cars)
        })
    }
})
//Create
carsRouter.post("/create", async (req, res) => {
    const currentCar = {
        modele : req.body.modele ? req.body.modele : "",
        capacite : req.body.capacite ? req.body.capacite : 0,
        energie : req.body.energie ? req.body.energie : "",
        consoLitreParCentKm : req.body.consoLitreParCentKm ? req.body.consoLitreParCentKm : "",
        facteurEmision : req.body.facteurEmision ? req.body.facteurEmision : ""
    }
    if(currentCar.modele.trim()=="" || currentCar.capacite==0 || currentCar.energie.trim()==""){
        return res.send("incorrect format car")
    }
    await car.insertMany([currentCar])
    res.send(currentCar)
})
//Delete
carsRouter.post("/delete/:id", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id.trim()==""){
        return res.send("missing id")
    }
    await car.findOneAndDelete({ _id: id });
    res.send(id)
})
//Update
carsRouter.post("/update/:id", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    const bodyData = {
        modele: req.body.modele ? req.body.modele : "",
        capacite: req.body.capacite ? req.body.capacite : "",
        energie: req.body.energie ? req.body.energie : "",
        consoLitreParCentKm: req.body.consoLitreParCentKm ? req.body.consoLitreParCentKm : "",
        facteurEmision: req.body.facteurEmision ? req.body.facteurEmision : ""
    }
    user.findOne({ _id : id }).then(
        currentCar => {
            if(!currentCar){
                return res.send({ "message": "user not found" })
            }
            let UpdatedCar = {}
            UpdatedCar.modele = bodyData.modele ? bodyData.modele : currentCar.modele
            UpdatedCar.capacite = bodyData.capacite ? bodyData.capacite : currentCar.capacite
            UpdatedCar.energie = bodyData.energie ? bodyData.energie : currentCar.energie
            UpdatedCar.consoLitreParCentKm = bodyData.consoLitreParCentKm ? bodyData.consoLitreParCentKm : currentCar.consoLitreParCentKm
            UpdatedCar.facteurEmision = bodyData.facteurEmision ? bodyData.facteurEmision : currentCar.facteurEmision
            user.findOneAndUpdate({ _id: id }, {modele:UpdatedCar.modele, capacite:UpdatedCar.capacite, energie:UpdatedCar.energie, consoLitreParCentKm:UpdatedCar.consoLitreParCentKm, facteurEmision:UpdatedCar.facteurEmision}).then(
                data => {
                    if(!data){
                        return res.send({ "message": "user not found" })
                    }
                    return res.send(UpdatedCar)
                }
            )
        }
    )
}) 

module.exports = { carsRouter }