require('dotenv').config()

const PORT = process.env.SERVER_PORT

const express = require('express')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log('Running on port 6655')
})