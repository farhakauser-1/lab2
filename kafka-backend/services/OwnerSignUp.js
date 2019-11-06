var express = require('express')
var rest = require('../../Backend/models/Restaurant')

function handle_request (msg, callback) {
  console.log('Buyer SignUp-Kafka Backend')
  console.log(msg)
  rest.findOne({ email: msg.EmailID }, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      console.log(doc)
      if (doc) {
        console.log('exists')
        callback(null, 'user exists')
      } else {
        var myobj = new rest({
          username: msg.RestaurantName,
          password: msg.createpassword,
          email: msg.EmailID,
          RestaurantName: msg.RestaurantName
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
