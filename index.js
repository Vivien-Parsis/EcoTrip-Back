//import
const express = require("express")
const app = express()
const { carsRouter } = require("./src/router/carsRoute")
const { userRouter } = require("./src/router/usersRoute")
const { tripRouter } = require("./src/router/tripsRoute")
const { host, port } = require("./src/const/config")
//plugin
app.use(express.json())
//route
app.get('/', (req, res) => { res.send("eco-trip") })
app.use('/car', carsRouter)
app.use('/user', userRouter)
app.use('/trip', tripRouter)
app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})
//listen
app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`);
})