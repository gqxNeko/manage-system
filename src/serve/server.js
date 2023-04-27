const express = require('express')
const app = express()
const bodyParser = require('body-parser') //body参数解析

// 两种都支持解析
app.use(bodyParser.urlencoded({ extended: false })) //parse application/x-www-form-urlencoded
app.use(bodyParser.json()) //parse application/json

// 设置允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
  next()
})

//引入token生成工具
const jwt = require('jsonwebtoken')

//生成token
function generateToken(data, secret) {
  let token = jwt.sign(data, secret)
  return token
}

//解密token
// function getDecryptToken(token, secret) {
//   let data = jwt.verify(token, secret)
//   return data
// }

// 连接mysql数据库
const connection = require('./mysql')

// 增删改查都是对数据库进行的操作，但最终不是展示数据库的内容，而是当前页的内容
app.get('/userList', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  let searchSql = `select * from userinfo`
  let mid = ''
  let last = ''
  let total = 0

  // 分页加逆序
  const { limit = 10, offset = 0 } = req.query
  last = ` order by id desc limit ${offset},${offset + limit}`

  if (req.query.key) {
    mid += ` where locate('${req.query.key}',nickname) > 0 or locate('${req.query.key}',user_name) > 0`
    searchSql += mid
  }

  // 查total
  connection.query(searchSql, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        msg: '列表获取失败'
      })
      return
    }

    total = JSON.parse(JSON.stringify(data)).length
  })

  // 加上分页
  searchSql += last

  // // 测试查询 100w次 mac pro => 4.27s
  // for (let i = 0; i < 1000000; i++) {
  //   connection.query(searchSql, (err, data) => {
  //     if (err) {
  //       res.end(
  //         JSON.stringify({
  //           code: 500,
  //           msg: '列表获取失败'
  //         })
  //       )
  //       return
  //     }
  //     const result = JSON.parse(JSON.stringify(data))
  //     res.end(
  //       JSON.stringify({
  //         code: 200,
  //         msg: '列表获取成功',
  //         data: result,
  //         total: total
  //       })
  //     )
  //   })
  // }

  connection.query(searchSql, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        msg: '列表获取失败'
      })

      return
    }
    const result = JSON.parse(JSON.stringify(data))
    res.json({
      code: 200,
      msg: '列表获取成功',
      data: result,
      total: total
    })
  })
})

// 删除用户
app.get('/deleteUser', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  let curId = JSON.parse(req.query.id)
  // 支持删除多个
  let mulDelFlag = false
  if (curId !== null && typeof curId == 'object') {
    mulDelFlag = true
  }

  let delSql = `delete from userinfo where id=${JSON.parse(req.query.id)}`

  if (mulDelFlag) {
    const ids = JSON.parse(req.query.id)
    let str = `delete from userinfo where id=`
    const len = ids.length
    ids.forEach((item, index) => {
      if (index < len - 1) {
        str += item + ' or id='
      } else {
        str += item
      }
    })
    delSql = str
  }

  connection.query(delSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '删除失败' })
    } else {
      res.json({ code: 200, msg: '删除成功' })
    }
  })
})

// 验证登陆
app.post('/userLogin', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  const searchSql = `SELECT * from loginInfo where userName='${req.body.userName}' and password='${req.body.password}'`

  // 查询sql语句
  connection.query(searchSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '登录失败' })
      return
    }
    const result = JSON.parse(JSON.stringify(data))
    console.log(data)
    if (result.length) {
      delete result[0].password
      const time = String(+new Date())
      const token = generateToken(
        {
          name: req.body.username,
          password: req.body.password
        },
        time
      )
      res.json({
        code: 200,
        msg: '登录成功',
        userInfo: result[0],
        token: token,
        secret: time
      })
    } else {
      res.json({ code: 500, msg: '用户名或密码错误' })
    }
  })
})

// 添加用户
app.post('/userRegister', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })

  // 判断是否重名
  const searchUserNameSql = `select userName from loginInfo where userName='${req.body.userName}'`
  const searchNickNameSql = `select nickName from loginInfo where nickName='${req.body.nickName}'`

  let flag = true
  connection.query(searchUserNameSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '注册失败' })
      flag = false
      return
    }

    // 重名判断，跟之前的名称不能一样
    const result = JSON.parse(JSON.stringify(data))
    if (result.length) {
      res.json({ code: 500, msg: '用户名重复' })
      flag = false
      return
    }
  })
  if (!flag) {
    return
  }
  connection.query(searchNickNameSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '注册失败' })
      flag = false
      return
    }

    // 重名判断，跟之前的名称不能一样
    const result = JSON.parse(JSON.stringify(data))
    if (result.length) {
      res.json({ code: 500, msg: '昵称重复' })
      flag = false
      return
    }
  })
  if (!flag) {
    return
  }
  const addSql = `insert into loginInfo(nickName,userName,password,email,phone,male) 
  values(
    '${req.body.nickName}',
    '${req.body.userName}',
    '${req.body.password}',
		'18861819221@163.com'
		18861819221,
    'male',
    )`

  connection.query(addSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '添加失败，发生未知错误' })
      return
    }
    const time = String(+new Date())
    const token = generateToken(
      {
        name: req.body.userName,
        password: req.body.password
      },
      time
    )
    res.json({ code: 200, msg: '注册成功', token, secret: time })
  })
})

// 修改用户
app.post('/updateUser', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  // 判断是否重名
  const searchSql = `select * from loginInfo where nickName='${req.body.nickname}' or userName='${req.body.userName}'`

  connection.query(searchSql, (err, data) => {
    if (err) {
      res.json({ code: 500, msg: '发生未知错误' })
      return
    }
    const result = JSON.parse(JSON.stringify(data))

    // 重名判断，跟之前的名称不能一样
    let flag = result.length && result[0].id === req.body.id
    if (!flag) {
      res.json({ code: 500, msg: '用户名或昵称重复' })
      return
    }
  })
  let updateSql = `update loginInfo set nickName='${req.body.nickName}',
  userName='${req.body.userName}',
  password='${req.body.password}'
  where id=${req.body.id}`
  
  // 传的密码为空 不修改密码
  if (req.body.password == '') {
    updateSql = `update loginInfo set nickName='${req.body.nickName}',
    userName='${req.body.userName}'
    where id=${req.body.id}`
  }

  connection.query(updateSql, (err, data) => {
    if (err) {
      console.log(err)
      res.json({ code: 500, msg: '修改失败' })
    } else {
      res.json({ code: 200, msg: '修改成功' })
    }
  })
})

// 注销登陆
app.get('/userLogout', (req, res) => {
  // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' })
  res.json({ code: 200, msg: '注销成功' })
})

const server = app.listen(2200, () => {
  const address = server.address().address
  const port = server.address().port
  console.log({ address, port })
})
