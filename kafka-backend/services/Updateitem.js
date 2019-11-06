var restaurant = require('../../Backend/models/Restaurant')

function handle_request (msg, callback) {
  restaurant.findOne({ RestaurantName: msg.RestaurantName }, function (
    err,
    rest
  ) {
    if (err) {
      console.log('error')
    } else {
      console.log(rest.Menu)
      console.log(msg)

      for (var i in rest.Menu) {
        if (rest.Menu[i].Section == msg.section) {
          console.log(i + 'i')
          for (var j in rest.Menu[i].items) {
            if (rest.Menu[i].items[j].item === msg.initial) {
              console.log('Inside Update')
              rest.Menu[i].items[j].item = msg.item
              rest.Menu[i].items[j].cost = msg.cost
              rest.save().then(
                doc => {
                  console.log(' Updated successfully.', doc)
                  // return res.send('Success')
                  callback(null, 'success')
                },
                err => {
                  console.log('Unable to delete', err)
                  callback(err, null)
                }
              )
            }
          }
        }
      }
    }
  })
}
exports.handle_request = handle_request
