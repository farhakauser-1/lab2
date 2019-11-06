var express = require('express')
var router = express.Router()
var orders = require('../models/Messaging')
var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

router.get('/allmessages/:orderid', requireAuth, (req, res) => {
  console.log('Add items')
  orders.findOne({ orderid: req.params.orderid }, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      if (rest) {
        console.log(rest)
        res.send(rest)
      } else {
        var obj = new orders({
          orderid: req.params.orderid,
          Messages: []
        })
        obj
          .save()
          .then(
            doc2 => {
              console.log(' Added New Convo successfully.', doc2)
              res.send(doc2)
            },
            err => {
              console.log('Unable to add Convo', err)
            }
          )
          .catch()
      }
    }
  })
})
module.exports = router
