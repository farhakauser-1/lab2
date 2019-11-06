var orders = require('../../Backend/models/Orders')

function handle_request (msg, callback) {
  console.log('Add Orders to Restaurant')
  orders.find({ RestaurantName: msg }, function (err, rest) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      console.log(rest)
      callback(null, rest)
    }
  })
}
exports.handle_request = handle_request
