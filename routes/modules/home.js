const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// 路由

router.get('/', (_req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .lean()
    .then(data => {
      if (data.password === password) {
        return res.render('show', { data })
      }
      const wrong = 'Username 或 Password 錯誤'
      return res.render('index', { wrong , email})
    })
})

module.exports = router