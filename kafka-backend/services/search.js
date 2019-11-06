var express = require('express')
var menuSchema = require('../../Backend/models/Menu')

function handle_request (msg, callback) {
  console.log("'Search items'-Inside book kafka backend")
  console.log(msg)

  menuSchema.find({ item: msg }, function (err, rest) {
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
