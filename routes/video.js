const fs = require("fs")
const express = require("express")

const router = express.Router()

router.get("/", (req, res, next) => {
  // Define source of Video
  const path = "public/toystory.mp4"

  fs.stat(path, (err, stats) => {
    // Declare the range of the part of video which goes to bytes
    const range = req.headers.range

    // Make sure that the range is Correct
    if (!range) {
      const err = new Error("Wrong range")
      err.status = 416
      return next(err)
    }

    // Convert the range to array which can easy to handle it
    const parts = range.replace(/bytes=/, "").split("-")

    // Convert the start Value to an Integer
    const start = parseInt(parts[0], 10)

    // Get the file size
    const fileSize = stats.size

    // Check for a new chuck of data. IF ? Send : else send the last chuck
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    // Declare the chunk size
    const chunkSize = end - start + 1

    // Define the Head of the chunk for the file we sent
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    }

    // Send the custom header
    res.writeHead(206, head)

    // Create new Stream chan based on what browser request
    const stream = fs.createReadStream(path, { start, end })

    // When the stream start => pipe the data through the res object
    stream.on("open", function () {
      stream.pipe(res)
    })

    // If error => STOP and send the error
    stream.on("error", (error) => {
      return next(error)
    })
  })
})

module.exports = router
