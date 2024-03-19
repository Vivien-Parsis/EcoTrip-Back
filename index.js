//import
const express = require("express")
const app = express()
const carFleetRouter = require("./src/router/carFleetRoute")
//const
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000
//plugin
app.use('/api/carfleet', carFleetRouter)

app.listen(port, ()=>{
    console.log(`Le serveur API écoute sur http://${host}:${port}`);
})