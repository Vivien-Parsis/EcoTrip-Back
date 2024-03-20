const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL ? process.env.DB_URL : ""
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 3000

module.exports = { db_url, host, port }