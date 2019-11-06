var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')

// jwt
var passport = require('passport')
var jwt = require('jsonwebtoken')
const secret = 'secret'

router.post('/ownerlogin', (req, res) => {
  console.log('Owner Log In')
  console.log(req.body)
  restaurant.findOne({ email: req.body.username }, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      if (doc) {
        if (req.body.password === doc.password) {
          console.log('Login Successfull')
          var user = {
            type: 'owner',
            userid: doc._id,
            username: doc.RestaurantName
          }
          var token = jwt.sign(user, secret, {
            expiresIn: 10080 // in seconds
          })
          // res.send(doc)
          res.status(200).json({ success: true, token: token, doc: doc })
        } else {
          console.log('Incorrect password')
          res.end('Incorrect password')
        }
      } else {
        console.log('Email Id not found')
        res.end('Email Id not found')
      }
    }
  })
})
module.exports = router
