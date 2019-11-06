var express = require('express')
var ownermodel = require('../../Backend/models/Restaurant')

function handle_request (msg, callback) {
  console.log('Owner Profile -Inside book kafka backend')
  console.log(msg)

  ownermodel.findOne({ RestaurantName: msg }, function (err, doc) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      // res.send(doc)
      if (doc) {
        console.log('Owner Profile fetched' + doc)
        callback(null, doc)
      }
    }
  })
}

exports.handle_request = handle_request
