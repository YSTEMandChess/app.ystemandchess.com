const express = require('express')
const connectDB = require('./config/db')
const passport = require('passport')
require('./config/passport.js')
const app = express()
const cors = require('cors')
const config = require('config')

//Enable Cors
app.use(cors(config.get('corsOptions')))

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
