var express = require('express')
var router = express.Router()
var usermodel = require('../models/Users')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.get('/userprofile/:userid', requireAuth, (req, res) => {
  console.log('User Profile' + req.params.userid)

  kafka.make_request(
    'DisplayUserProfile',

    req.params.userid,
    function (err, doc) {
      if (err) {
        console.log('error')
      } else {
        console.log('User Profile fetched')
        res.send(doc)
      }
    }
  )
})
module.exports = router
