var express = require('express')
var usermodel = require('../../Backend/models/Users')

function handle_request (msg, callback) {
  console.log('User Profile -Inside book kafka backend')
  console.log(msg)

  console.log('User Profile')
  usermodel.findOne({ _id: msg }, function (err, doc) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      // res.send(doc)
      if (doc) {
        console.log('User Profile fetched' + doc)
        callback(null, doc)
      }
    }
  })
}

exports.handle_request = handle_request
