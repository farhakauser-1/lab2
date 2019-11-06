var restaurant = require('../../Backend/models/Restaurant')
var menuSchema = require('../../Backend/models/Menu')
function handle_request (msg, callback) {
  console.log('Delete items')
  restaurant.findOne({ RestaurantName: msg.RestaurantName }, function (
    err,
    rest
  ) {
    if (err) {
      console.log('error')
    } else {
      rest.Menu = msg.newmenu
      menuSchema.deleteOne({ item: msg.item }, () => {
        console.log('deleted')
      })

      rest.save().then(
        doc => {
          console.log(' Deleted successfully.', doc)
          callback(null, 'deleted')
        },
        err => {
          console.log('Unable to delete', err)
          callback(err, null)
        }
      )
    }
  })
}
exports.handle_request = handle_request
