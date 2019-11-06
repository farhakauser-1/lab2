var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')

var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

console.log('From Require Auth' + requireAuth)

router.post('/addcategory/', requireAuth, (req, res) => {
  console.log('addcategory')
  kafka.make_request('AddCategory', req.body, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      res.send('Success')
    }
  })
})
module.exports = router
