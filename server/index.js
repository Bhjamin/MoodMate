require('dotenv').config()

const {SERVER_PORT} = process.env.SERVER_PORT

const { User, Entries } = require('./models/user')
const { sequelize } = require('./util/database')



const express = require('express')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => {
        console.log('Running on port 6655')
    })
}).catch(err => console.log(err))
