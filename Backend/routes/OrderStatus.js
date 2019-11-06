var express = require('express')
var router = express.Router()
var orders = require('../models/Orders')

var kafka = require('../kafka/client')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

router.post('/updateorderstatus/', requireAuth, (req, res) => {
  console.log('updateorderstatus')
  kafka.make_request('OrderStatus', req.body, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      console.log('Status Updated')
      res.send(doc)
    }
  })
})

module.exports = router
