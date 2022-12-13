const { Client } = require('pg')
require('dotenv').config();

const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.PORT,
    password: process.env.PASS,
    database: process.env.DB
})

module.exports = client