//import
const express = require("express")
const app = express()
const carFleetRouter = require("./src/router/carsRoute")
const userListRouter = require("./src/router/usersRoute")
const { host, port } = require("./src/const/config")
//plugin
app.use(express.json())
//route
app.use('/car', carFleetRouter)
app.use('/user', userListRouter)
//listen
app.listen(port, () =>{
    console.log(`This server is listen on http://${host}:${port}`);
})