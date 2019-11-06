// const mongoose = require('mongoose')

const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var util = require('util')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var kafka = require('./kafka/client')
var passport = require('passport')
let jwt = require('jsonwebtoken')
var requireAuth = passport.authenticate('jwt', { session: false })
// app.use(express.json()) // Make sure it comes back as json

// models
var usermodel = require('./models/Users')
var restaurant = require('./models/Restaurant')
var order = require('./models/Orders')
var menuSchema = require('./models/Menu')
var Messaging = require('./models/Messaging')

// var mongoose = require('mongoose')
console.log(menuSchema)

var mongoose = require('./Mongoose.js')

// routes
const userlogin = require('./routes/UserLogin')
const ownerlogin = require('./routes/OwnerLogin')
const usersignup = require('./routes/UserSignUp')
const displayuserprofile = require('./routes/DisplayUserProfile')
const updateuserprofile = require('./routes/UpdateUserprofile')
var fetchitems = require('./routes/Additems')
var deleteitems = require('./routes/DeleteItem')
var updateitems = require('./routes/Updateitem')
var additems = require('./routes/Add')
var addcategory = require('./routes/Addcategory')
var search = require('./routes/search')
var placeorder = require('./routes/PlaceOrder')
var restorders = require('./routes/RestaurantOrders')
var updatestatus = require('./routes/OrderStatus')
var userorders = require('./routes/UserOrders')

var getMessages = require('./routes/getMessages')
var savemessages = require('./routes/saveMessages')

var OwnerSignUp = require('./routes/OwnerSignUp')
var displayownerprofile = require('./routes/DisplayOwnerProfile')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(passport.initialize())
require('./Config/passport')(passport)

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(
  session({
    secret: 'Secured!!',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
)

// Allow Access Control
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  res.setHeader('Cache-Control', 'no-cache')
  next()
})
console.log(userlogin)

var myobj = new usermodel({
  username: 'farha@yahoo.com',
  phoneNumber: '123444'
})
/* myobj.save().then(
  doc => {
    console.log(' Added Grade successfully.', doc)
    callback(null, doc)
  },
  err => {
    console.log('Unable to add Grade', err)
  }
) */
console.log(JSON.stringify(Messaging))
usermodel.findOne({ username: 'FarhaKauser' }, function (err, doc) {
  if (err) {
    console.log('error')
  } else {
    if (doc) {
      console.log('find' + doc.phoneNumber)
    } else {
      console.log('Incorrect credentials')
    }
  }
})
/* var obj = new Messaging({
  orderid: '1',
  Messages: []
})
obj
  .save()
  .then(
    doc => {
      console.log(' Added Grade successfully.', doc)
    },
    err => {
      console.log('Unable to add Grade', err)
    }
  )
  .catch()
/* restaurant.findOne({ RestaurantName: 'Badmash' }, function (err, rest) {
  if (err) {
    console.log('error')
  } else {
    if (rest) {
      console.log(rest.Menu)
      console.log(
        rest.Menu.filter(x => {
          if (x.Section == 'Lunch') {
            x.items.push({ item: 'butter-naan', cost: 145 })
            x.items.forEach(element => {
              console.log(element.item)
              console.log(element.cost)
            })
          }
          if (x.Section == 'Lunch') console.log('HI Lunch')
        })
      )

      rest.save().then(
        doc => {
          console.log(' Added changes successfully.', doc)
        },
        err => {
          console.log('Unable to change', err)
        }
      )
    } else {
      console.log('unable to access')
    }
  }
}) */

// passport

/* use routes */
app.use(userlogin)
app.use(ownerlogin)
app.use(usersignup)
app.use(displayuserprofile)
app.use(updateuserprofile)
app.use(fetchitems)
app.use(deleteitems)
app.use(updateitems)
app.use(additems)
app.use(addcategory)
app.use(search)
app.use(placeorder)
app.use(restorders)
app.use(updatestatus)
app.use(userorders)

app.use(OwnerSignUp)
app.use(displayownerprofile)

app.use(getMessages)
app.use(savemessages)
app.listen(3100, () => console.log('Started Canvas Server on 3100!'))
