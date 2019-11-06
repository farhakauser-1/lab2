var express = require('express')
var usermodel = require('../../Backend/models/Users')

// jwt
// var passport = require('passport')
// var jwt = require('jsonwebtoken')
// const secret = 'secret'
function handle_request (msg, callback) {
  console.log('Inside  Kafka Backend Login')
  console.log('Message', msg)
  console.log('Buyer Log In')
  console.log(msg)
  console.log('struggling here ' + JSON.stringify(usermodel) + usermodel)
  console.log('attempting to get to mongo')

  usermodel.findOne({ email: msg.username }, function (err, doc) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      if (doc) {
        if (msg.password === doc.password) {
          console.log('Login Successfull')
          // Create token if the password matched and no error was thrown
          /* var user = {
            userid: doc._id,
            username: doc.username
          }
          var token = jwt.sign(user, secret, {
            expiresIn: 10080 // in seconds
          })
          res.status(200).json({ success: true, token: token, doc: doc })
          // res.send(doc) */
          console.log('Sending back the Mongo document to callback')
          callback(null, doc)
        } else {
          console.log('Incorrect password')
          // res.end('Incorrect password')
          callback(null, null)
        }
      } /* else {
        console.log('Email Id not found')
        // res.end('Email Id not found')
        callback(null, null)
      } */
    }
  })
}
exports.handle_request = handle_request
