var express = require('express')
var router = express.Router()
var restaurant = require('../models/Restaurant')

var kafka = require('../kafka/client')

router.post('/updateitems/', (req, res) => {
  console.log('Update items')
  kafka.make_request('Updateitem', req.body, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      res.send('Success')
    }
  })
})

module.exports = router
