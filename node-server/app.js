// 导入
const express = require('express')
let { conMysql } = require('./mysql')

// 创建统一的返回报文对象
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed
    this.msg = msg
    this.code = code
    this.data = data
  }
}

// 创建
const app = express()

// 设置跨域访问
const cors = require('cors')
app.use(cors())

// 测试接口
app.get('/info',(req, res) => {
  res.send('Hello shaoyahu !')
})

// 获取全部用户信息
app.get('/getUser', (req, res) => {
  let sql = 'select * from userinfo'
  conMysql(sql).then(result => {
    res.send(result)
  })
})

// 登录
app.get('/login', (req, res) => {
  let sql = `select * from userinfo where username = '${req.query.username}'`
  conMysql(sql).then(result => {
    if (result[0].password === req.query.password) {
      let response = new Response(true, '登录成功', 200, result)
      res.send(response)
    } else {
      let response = new Response(false, '用户名或密码错误', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('数据库连接出错!')
  })
})

// 修改密码
app.post('/updatePassword', (req, res) => {
  let sql = `update userinfo set password = '${req.query.newPassword}' where username = '${req.query.username}'`
  conMysql(sql).then(result => {
    if (result.affectedRows == 1) {
      let response = new Response(true, '修改成功', 200)
      res.send(response)
    } else {
      let response = new Response(false, '修改失败,请稍后重试', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('数据库连接出错!')
  })
})

// 启动
app.listen(3000, () => {
  console.log('express server running at http://127.0.0.1:' + 3000)
})
