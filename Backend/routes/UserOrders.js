var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')
var menuSchema = require('../models/Menu')
var orders = require('../models/Orders')

var kafka = require('../kafka/client')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.get('/userorders/:username', requireAuth, (req, res) => {
  console.log('Get orders')
  kafka.make_request('UserOrders', req.params.username, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      console.log(rest)
      res.send(rest)
    }
  })
})
module.exports = router
