const express = require("express")

const router = express.Router()

// Home router
router.get("/", (req, res) => {
  res.render("index.hbs")
})
module.exports = router
