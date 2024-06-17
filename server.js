const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const color = require('colors')
const app = express()
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

dotenv.config()
connectDB()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes);
app.use('/api/transaction', transactionRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})