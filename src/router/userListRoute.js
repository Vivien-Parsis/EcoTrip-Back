module.exports = function (fastify, opts, done) {
    fastify.get('/get', (req, res)=>{
        res.send('userlist/get')
    })
    done()
}