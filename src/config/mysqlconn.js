
const { createPool } = require("mysql2/promise")
require("dotenv").config()

const mysqlConfigConn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const mysqlPool = createPool(mysqlConfigConn)
module.exports = { mysqlPool }