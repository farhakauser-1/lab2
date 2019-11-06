var orders = require('../../Backend/models/Orders')

function handle_request (msg, callback) {
  console.log('createorder')
  var order = new orders({
    username: msg.username,
    RestaurantName: msg.RestaurantName,
    cart: msg.cart
  })
  order.save().then(
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
}

exports.handle_request = handle_request
