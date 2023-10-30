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
app.use('/user', require('./routes/users'))
app.use('/category', require('./routes/categorys'))
app.use('/meetings', require('./routes/meetings'))
app.use('/auth', require('./routes/auth'))
app.use('/timeTracking', require('./routes/timeTracking'))
app.use('/puzzles', require('./routes/puzzles'))
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
