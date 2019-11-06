var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')
var menuSchema = require('../models/Menu')

var kafka = require('../kafka/client')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

router.post('/deleteitems/', requireAuth, (req, res) => {
  console.log('Delete items')
  kafka.make_request('DeleteItem', req.body, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      res.send('deleted')
    }
  })
})
module.exports = router
