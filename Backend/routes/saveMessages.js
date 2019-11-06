var express = require('express')
var router = express.Router()
var orders = require('../models/Messaging')
var passport = require('passport')
var jwt = require('jsonwebtoken')

var kafka = require('../kafka/client')

var requireAuth = passport.authenticate('jwt', {
  session: false
})

router.post('/savemessages/', requireAuth, (req, res) => {
  console.log('Add items')
  orders.findOne({ orderid: req.body.orderid }, function (err, doc) {
    console.log(req.body)
    if (err) {
      console.log('error')
    } else {
      doc.Messages = req.body.Messages

      doc.save().then(
        doc1 => {
          console.log(' Messaged.', doc1)
          res.send(doc1)
        },
        err => {
          console.log('Unable to Message', err)
        }
      )
    }
  })
})
module.exports = router
