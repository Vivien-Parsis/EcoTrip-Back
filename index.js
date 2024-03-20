//import
const express = require("express")
const app = express()
const carFleetRouter = require("./src/router/carFleetRoute")
const userListRouter = require("./src/router/userListRoute")
//const
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000
//route
app.use('/carfleet', carFleetRouter)
app.use('/user', userListRouter)

app.listen(port, ()=>{
    console.log(`This server is listen on http://${host}:${port}`);
})