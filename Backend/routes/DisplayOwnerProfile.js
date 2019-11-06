var express = require('express')
var router = express.Router()
var usermodel = require('../models/Restaurant')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.get('/ownerprofile/:RestaurantName', requireAuth, (req, res) => {
  console.log('User Profile' + req.params.userid)

  kafka.make_request(
    'DisplayOwnerProfile',

    req.params.RestaurantName,
    function (err, doc) {
      if (err) {
        console.log('error')
      } else {
        console.log('Owner Profile fetched')
        res.send(doc)
      }
    }
  )
})
module.exports = router
