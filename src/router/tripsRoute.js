const router = require('express').Router()
const { trip } = require('../middleware/db')
//Read
router.get("/get/:id?", async (req, res) => {
    const id = req.params.id ? req.params.id : ""
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
        debut: req.params.debut ? req.params.debut : "",
        fin: req.params.fin ? req.params.fin : "",
        distance: req.params.distance ? req.params.distance : "",
        conducteurs: req.params.conducteurs ? req.params.conducteurs : "",
        lieuDepart: req.params.lieuDepart ? req.params.lieuDepart : "",
        lieuFin: req.params.lieuFin ? req.params.lieuFin : "",
        passagers: [],
    }
    if(currenttrip.debut.trim()==""||currenttrip.fin.trim()==""||currenttrip.distance.trim()==""||currenttrip.conducteurs.trim()==""||currenttrip.lieuDepart.trim()==""||currenttrip.lieuFin.trim()==""){
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
        debut: req.params.debut ? req.params.debut : "",
        fin: req.params.fin ? req.params.fin : "",
        distance: req.params.distance ? req.params.distance : "",
        conducteurs: req.params.conducteurs ? req.params.conducteurs : "",
        lieuDepart: req.params.lieuDepart ? req.params.lieuDepart : "",
        lieuFin: req.params.lieuFin ? req.params.lieuFin : "",
        passagers: req.params.passagers ? req.params.passagers : "",
    }
    if(currenttrip.debut.trim()==""||currenttrip.fin.trim()==""||currenttrip.distance.trim()==""||currenttrip.conducteurs.trim()==""||currenttrip.lieuDepart.trim()==""||currenttrip.lieuFin.trim()==""){
        return res.send("incorrect format")
    }
    await trip.findOneAndUpdate({ _id: id }, updatedtrip);
    res.send(updatedtrip)
}) 

module.exports = router