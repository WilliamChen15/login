const express = require('express')
const exphbs = require('express-handlebars')
// 引入 express-session 套件
const session = require('express-session')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')


const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 建立 session 的 middleware，並將需要帶入的屬性放進 options 物件中
app.use(session({
  secret: 'sndkfnofnosfpowekmprwjqlierjw',
  // 代表在每次與使用者互動後，不會強制把 session 儲存，除非 session 有變動
  resave: false,
  saveUninitialized: false
  
}))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})