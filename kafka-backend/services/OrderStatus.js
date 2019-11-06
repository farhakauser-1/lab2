var orders = require('../../Backend/models/Orders')
function handle_request (msg, callback) {
  orders.findOne({ _id: msg._id }, function (err, rest) {
    if (err) {
      console.log('error')
    } else {
      rest.orderStatus = msg.orderstatus
      rest.save().then(
        doc => {
          console.log(' Added successfully.', doc)
          // res.send(doc)
          callback(null, doc)
        },
        err => {
          console.log('Cant Add', err)
          callback(err, null)
        }
      )
      // res.send(rest)
    }
  })
}
exports.handle_request = handle_request
