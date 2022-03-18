const express = require('express')
const mongoose = require('mongoose')
const keys = require("./config/keys")
const cors = require('cors')

mongoose.connect(keys.mongo_uri, (error) => {
    console.log(error)
})

const app = express()
app.use(express.json())
app.use(cors())

app.use('/gvn7dqcu', require('./routes/query'))

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

app.get('/', (req, res) => {
    res.send({Project: 'wellcome'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
