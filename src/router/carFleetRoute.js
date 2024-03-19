const router = require('express').Router();

router.get("/get/:id?", (req, res) => {
    res.send("/api/carfleet/get")
})

module.exports = router