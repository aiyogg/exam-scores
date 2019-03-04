const config = require('../config')
const dbConfig = config.database
const mysql = require('mysql')

const pool = mysql.createPool({
  database: dbConfig.DATABASE,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD
})
