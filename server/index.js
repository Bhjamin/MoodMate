require('dotenv').config()

const {SERVER_PORT} = process.env

const { User, Entries } = require('./models/user')
const { sequelize } = require('./util/database')

const { register, login } = require('./controller/auth')
const { getUserPoints, updateUserPoints } = require('./controller/points')
const { getUserDate, updateUserDate } = require('./controller/date')
const { getUserTaskDate, updateUserTaskDate } = require('./controller/taskDate')
const { addEntry, getEntries } = require('./controller/entry')

User.hasMany(Entries)
Entries.belongsTo(User)


const express = require('express')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/register', register )
app.post('/login', login )
app.get('/points/:userId', getUserPoints)
app.put('/points/:userId', updateUserPoints)
app.get('/emotion/:userId', getUserDate)
app.put('/emotion/:userId', updateUserDate)
app.get('/task/:userId', getUserTaskDate)
app.put('/task/:userId', updateUserTaskDate)
app.post('/entry/:userId', addEntry)
app.get('/entry/:userId', getEntries)


sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Running on ${SERVER_PORT}`)
    })
}).catch(err => console.log(err))
