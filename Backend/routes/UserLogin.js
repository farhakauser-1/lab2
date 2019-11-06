var express = require('express')
var router = express.Router()
var usermodel = require('../models/Users')

var kafka = require('../kafka/client')

// jwt
var passport = require('passport')
var jwt = require('jsonwebtoken')
const secret = 'secret'

router.post('/userlogin', (req, res) => {
  console.log('Buyer Log In')
  console.log(req.body)
  kafka.make_request('UserLogin', req.body, function (err, result) {
    if (err) {
      console.log('error')
    } else {
      if (result) {
        // if (req.body.password === doc.password) {
        console.log('Login Successfull, backend')
        // Create token if the password matched and no error was thrown
        var user = {
          type: 'buyer',
          userid: result._id,
          username: result.username
        }
        var token = jwt.sign(user, secret, {
          expiresIn: 10080 // in seconds
        })
        res.status(200).json({ success: true, token: token, doc: result })
        // res.send(doc)
        // }
      } else {
        console.log('Incorrect password')
        res.end('Incorrect password')
      }
      /* else {
        console.log('Email Id not found')
        res.end('Email Id not found')
      } */
    }
  })
})
module.exports = router
