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

var kafka = require('../kafka/client')

router.post('/updateuserprofile/', requireAuth, (req, res) => {
  kafka.make_request('UpdateUserProfile', req.body, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      console.log(doc)
      res.send(doc)
    }
  })
})
module.exports = router
