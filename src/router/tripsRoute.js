const router = require('express').Router()
const mongoose = require('mongoose')
const { trip } = require('../middleware/db')
//Read
router.get("/get/:id?", async (req, res) => {
    const id = req.body.id ? req.body.id : ""
    if(id){
        trip.findOne({_id:id}).then((trip)=>{
            res.send(trip)
        })
    }else{
        trip.find().then((trips) => {
            res.send(trips)
        })
    }
})
//Create
router.post("/create", async (req, res) => {
    const currenttrip = {
        debut: req.body.debut ? req.body.debut : "",
        fin: req.body.fin ? req.body.fin : "",
        distance: req.body.distance ? req.body.distance : "",
        conducteurs: req.body.conducteurs ? new mongoose.Types.ObjectId(req.body.conducteurs) : null,
        lieuDepart: req.body.lieuDepart ? req.body.lieuDepart : "",
        lieuFin: req.body.lieuFin ? req.body.lieuFin : "",
        passagers: [],
    }
    console.log(currenttrip)
    if(currenttrip.debut.trim()==""||currenttrip.fin.trim()==""||currenttrip.distance.trim()==""||!currenttrip.conducteurs||currenttrip.lieuDepart.trim()==""||currenttrip.lieuFin.trim()==""){
        return res.send("incorrect format")
    }
    await trip.insertMany([currenttrip])
    res.send(currenttrip)
})
//Delete
router.post("/:id/delete", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    if(id.trim()==""){
        return res.send("missing id")
    }
    await trip.findOneAndDelete({ _id: id });
    res.send(id)
})
//Update
router.post("/:id/update", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
    const updatedtrip = {
        debut: req.body.debut ? req.body.debut : "",
        fin: req.body.fin ? req.body.fin : "",
        distance: req.body.distance ? req.body.distance : "",
        conducteurs: req.body.conducteurs ? new mongoose.Types.ObjectId(req.body.conducteurs) : null,
        lieuDepart: req.body.lieuDepart ? req.body.lieuDepart : "",
        lieuFin: req.body.lieuFin ? req.body.lieuFin : "",
        passagers: req.body.passagers ? req.body.passagers : "",
    }
    if(currenttrip.debut.trim()==""||currenttrip.fin.trim()==""||currenttrip.distance.trim()==""||currenttrip.conducteurs||currenttrip.lieuDepart.trim()==""||currenttrip.lieuFin.trim()==""){
        return res.send("incorrect format")
    }
    await trip.findOneAndUpdate({ _id: id }, updatedtrip);
    res.send(updatedtrip)
}) 

module.exports = router