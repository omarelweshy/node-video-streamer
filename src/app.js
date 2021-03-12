const path = require("path")
const express = require("express")
const hbs = require("hbs")

// Define Express app
const app = express()
const port = process.env.PORT || 3000

// Define pathes
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setiing up Pug template engine
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setting static DIR to serve
app.use(express.static(publicDirPath))

app.get("/", (req, res) => {
  res.render("index.hbs")
})

// Setting up Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
