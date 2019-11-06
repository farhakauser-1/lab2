var express = require('express')
var router = express.Router()
var usermodel = require('../models/Users')

var kafka = require('../kafka/client')

router.post('/usersignup', (req, res) => {
  console.log('Buyer SignUp')
  console.log(req.body)
  kafka.make_request('UserSignUp', req.body, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      console.log(doc)
      if (doc == 'Your GrubHub UserID is Created') {
        // console.log('exists')
        // return res.send('user exists')
        console.log(' Added User successfully.', doc)
        res.end('Your GrubHub UserID is Created')
      } else if (doc == 'Unable to add User') {
        res.end('Unable to add User')
      } else res.end('user exists')
    }
  })
})
module.exports = router
