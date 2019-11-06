var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')
var menuSchema = require('../models/Menu')
var orders = require('../models/Orders')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.get('/allrestorders/:RestaurantName', requireAuth, (req, res) => {
  console.log('Add Orders to Restaurant')
  kafka.make_request('RestaurantOrders', req.params.RestaurantName, function (
    err,
    doc
  ) {
    if (err) {
      console.log('error')
    } else {
      console.log(doc)
      res.send(doc)
    }
  })
})
module.exports = router
