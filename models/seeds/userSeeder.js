const db = require('../../config/mongoose')
const user = require('../user')

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  user.create(users)
    .then(() => {
      console.log("done.")
      db.close()
    })
    .catch(err => console.log(err))
})