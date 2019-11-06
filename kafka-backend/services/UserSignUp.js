var express = require('express')
var usermodel = require('../../Backend/models/Users')

function handle_request (msg, callback) {
  console.log('Buyer SignUp-Kafka Backend')
  console.log(msg)
  usermodel.findOne({ email: msg.EmailID }, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      console.log(doc)
      if (doc) {
        console.log('exists')
        callback(null, 'user exists')
      } else {
        var myobj = new usermodel({
          username: msg.Name,
          password: msg.createpassword,
          email: msg.EmailID
        })
        myobj.save().then(
          doc => {
            console.log(' Added User successfully.', doc)
            // res.end('Your GrubHub UserID is Created')
            callback(null, 'Your GrubHub UserID is Created')
          },
          err => {
            console.log('Unable to add User', err)
            callback(err, null)
          }
        )
      }
    }
  })
}

exports.handle_request = handle_request
