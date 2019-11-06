var restaurant = require('../../Backend/models/Restaurant')

function handle_request (msg, callback) {
  console.log('To Correct Function')
  restaurant.findOne({ RestaurantName: msg }, function (err, rest) {
    console.log('Inside the Function' + msg)
    if (err) {
      console.log('error')
    } else {
      if (rest.Menu.length > 0) {
        console.log('REstaurant Menu Length' + rest.Menu.length)
        callback(null, rest.Menu)
      } else {
        // res.send('No Such item')
        console.log('No Such item')
        callback(err, null)
      }
    }
  })
}
exports.handle_request = handle_request
