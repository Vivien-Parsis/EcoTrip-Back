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
    const updatedCar = {
        modele : req.body.modele ? req.body.modele : "",
        capacite : req.body.capacite ? req.body.capacite : 0,
        energie : req.body.energie ? req.body.energie : ""
    }
    if(updatedCar.modele.trim()=="" || updatedCar.capacite==0 || updatedCar.energie.trim()==""){
        return res.send("incorrect format car")
    }
    await car.findOneAndUpdate({ _id: id }, updatedCar);
    res.send(updatedCar)
}) 

module.exports = { carsRouter }