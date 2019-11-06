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

console.log('From Require Auth' + requireAuth)

router.get('/search/:item', requireAuth, (req, res) => {
  console.log('Search items')
  console.log(req.params.item)
  kafka.make_request('search', req.params.item, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      console.log(rest)
      res.send(rest)
    }
  })
})
module.exports = router
