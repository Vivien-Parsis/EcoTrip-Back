const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL ? process.env.DB_URL : ""

module.exports = { db_url }