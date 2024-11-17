const express = require("express");
const router = express.Router();


router.get("/name", (req, res)=>{
    res.send("Zemenu Mekuria")
})

router.get("/hobby", (req, res) => {
    res.send("I like reading in my free time")
})


module.exports = router;


