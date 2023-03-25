require('dotenv').config()

const {SERVER_PORT} = process.env

const { User, Entries } = require('./models/user')
const { sequelize } = require('./util/database')

const { register, login } = require('./controller/auth')

User.hasMany(Entries)
Entries.belongsTo(User)


const express = require('express')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/register', register )
app.post('/login', login )


sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => {
        console.log(`Running on ${SERVER_PORT}`)
    })
}).catch(err => console.log(err))
