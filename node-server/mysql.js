let mysql = require('mysql')
const db_config = {
  host:'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'node_app'
}


function conMysql(sql) {
  let connect = mysql.createConnection(db_config)
  // 开始连接数据库
  connect.connect(function (err) {
    if (err) {
      console.log(`mysql连接失败: ${err}!`)
    } else {
      // console.log('mysql连接成功!')
    }
  })
  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        let res = JSON.parse(JSON.stringify(result))
        closeMysql(connect)
        resolve(res)
      }
    })
  })
}
// 查询成功后关闭mysql
function closeMysql(connect) {
  connect.end((err) => {
    if (err) {
      console.log(`mysql关闭失败:${err}!`)
    } else {
      // console.log('mysql关闭成功!')
    }
  })
}
exports.conMysql = conMysql