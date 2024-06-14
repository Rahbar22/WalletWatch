const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const color = require('colors')
const app = express()
const connectDB = require('./config/db')

dotenv.config()
connectDB()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Welcome");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})