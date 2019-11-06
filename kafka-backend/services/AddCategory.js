var restaurant = require('../../Backend/models/Restaurant')

function handle_request (msg, callback) {
  console.log('addcategory')
  restaurant.findOne({ RestaurantName: msg.RestaurantName }, function (
    err,
    rest
  ) {
    if (err) {
      console.log('error')
      callback(err, null)
    } else {
      rest.Menu.push({ Section: msg.Section })
      rest.save().then(
        doc => {
          console.log(' Deleted successfully.', doc)
        },
        err => {
          console.log('Unable to delete', err)
        }
      )
      // res.send('Success')
      callback(null, 'Success')
    }
  })
}

exports.handle_request = handle_request
