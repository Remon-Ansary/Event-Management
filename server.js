const express = require("express")
const cors = require("cors")

const app = express()

var corsOptions = {
  origin: "http://localhost:8081",
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//routers
const router = require("./routes/Router.js")
app.use("/api/", router)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." })
})

//server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
