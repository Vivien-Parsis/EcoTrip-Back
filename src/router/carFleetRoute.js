const { ObjectId } = require("@fastify/mongodb")
const db = require("../middleware/db")
const collName = "CarFleet"

module.exports = async function (fastify, opts, done) {
    fastify.get('/get/:id', async function (req, res) {
        const carFleet = fastify.mongo.client.db(db.DBName).collection(collName)
        try{
            const data = await carFleet.find(req.params.id ? {_id : new ObjectId(req.params.id)} : {})
            res.send(await data.toArray())
        }catch(err){
            if (err) throw err;
            res.send("err")
        }
    })
    done()
}