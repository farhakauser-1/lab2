var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')
var menu = require('../models/Menu')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.get('/fetchitems/:RestaurantName', requireAuth, (req, res) => {
  console.log('Add items')
  restaurant.findOne({ RestaurantName: req.params.RestaurantName }, function (
    err,
    rest
  ) {
    if (err) {
      console.log('error')
    } else {
      if (rest.Menu.length > 0) {
        console.log(rest.Menu.length)
        return res.send(rest.Menu)
      } else {
        res.send('No Such item')
        console.log('No Such item')
      }
    }
  })
})
module.exports = router
