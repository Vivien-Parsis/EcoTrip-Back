const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000
const mongoUrl = 'mongodb://localhost:27017'
const fastify = require("fastify")({logger:true})

fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: mongoUrl
  })
fastify.get("/",(req, res)=>{
    res.send("Hello World !")
})

fastify.register(require('./src/router/carFleetRoute'), { prefix: '/api/carfleet' })
fastify.register(require('./src/router/userListRoute'), { prefix: '/api/userlist' })

fastify.listen({host: host, port: port }, (err, address) => {
    if (err) throw err
    console.log(`listening to ${address}`)
})