const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "I am up"}).status(200);
})

module.exports = router;
