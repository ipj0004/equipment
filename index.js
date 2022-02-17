const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect("mongodb+srv://ipj0004:yuyu51@cluster0.32yj7.mongodb.net/equipment?retryWrites=true&w=majority")

const app = express()
app.use(express.json())
app.use(cors())

app.use('/gvn7dqcu', require('./routes/query'))

app.get('/', (req, res) => {
    res.send({Project: 'wellcome'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
