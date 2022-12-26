const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// 路由

router.get('/', (req, res) => {
  const logIn = req.session.isLoggedIn
  const _id = req.session._id
  // console.log('登入狀態:', logIn)
  // console.log('使用者id:', _id)

  // 若已經登入，顯示登入後畫面
  if (logIn) {
    User.findOne({ _id })
      .lean()
      .then(data => {
        // console.log('撈到的資料:', data)
        return res.render('show', { data })
      })
  } else {
    res.render('index')
  }
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .lean()
    .then(data => {
      if (data.password === password) {
        req.session.isLoggedIn = true
        req.session._id = data._id
        return res.render('show', { data })
      }
      const wrong = 'Username 或 Password 錯誤'
      return res.render('index', { wrong, email })
    })
})

module.exports = router