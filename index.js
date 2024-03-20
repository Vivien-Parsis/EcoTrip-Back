//import
const express = require("express")
const app = express()
const carFleetRouter = require("./src/router/carFleetRoute")
const userListRouter = require("./src/router/userListRoute")
const bodyParser = require('body-parser');
//const
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000
//plugin
app.use(express.json())
//route
app.use('/car', carFleetRouter)
app.use('/user', userListRouter)
app.listen(port, ()=>{
    console.log(`This server is listen on http://${host}:${port}`);
})