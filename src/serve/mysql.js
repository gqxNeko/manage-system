//导入mysql模块
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Neko.520',
  database: 'login'
})
//建立连接
connection.connect()

module.exports = connection
