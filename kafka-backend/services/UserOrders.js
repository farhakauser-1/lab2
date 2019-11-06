var express = require('express')
var orders = require('../../Backend/models/Orders')

function handle_request (msg, callback) {
  console.log('User Orders -Inside book kafka backend')
  console.log(msg)

  orders.find({ username: msg }, function (err, rest) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      console.log(rest)
      // res.send(rest)
      callback(null, rest)
    }
  })
}

exports.handle_request = handle_request
