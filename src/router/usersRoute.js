const router = require('express').Router();

router.get("/get/:id?", (req, res) => {
    const id = req.params.id ? req.params.id : ""
    res.send("/api/userlist/get"+`${id?" "+id:""}`)
})

module.exports = router