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

console.log('From Require Auth' + requireAuth)

router.post('/createorder/', requireAuth, (req, res) => {
  console.log(req.body)
  kafka.make_request('PlaceOrder', req.body, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      if (doc) {
        console.log(doc)
        res.send(doc)
      } else {
        res.send('Not placed')
      }
    }
  })
})
module.exports = router
