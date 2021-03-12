const express = require("express")
const User = require("../src/models/user")

const router = express.Router()

// Home router
router.get("/", (req, res) => {
  res.render("index.hbs")
})

router.post("/user", async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send({ user })
  } catch (error) {
    res.status(400).send()
  }
})
module.exports = router
