var restaurant = require('../../Backend/models/Restaurant')
var menuSchema = require('../../Backend/models/Menu')

function handle_request (msg, callback) {
  console.log('Add items')
  restaurant.findOne({ RestaurantName: msg.RestaurantName }, function (
    err,
    rest
  ) {
    if (err) {
      console.log('error')
    } else {
      for (var i in rest.Menu) {
        var obj = new menuSchema({
          item: msg.item,
          cost: msg.cost,
          RestaurantName: msg.RestaurantName
        })
        obj.save().then(
          doc => {
            console.log(' Added successfully.', doc)
          },
          err => {
            console.log('Unable to Add', err)
          }
        )

        if (rest.Menu[i].section == msg.section) {
          rest.Menu = msg.Menu
          rest.save().then(
            doc => {
              console.log(' Added successfully.', doc)
              callback(null, 'Added successfully.')
            },
            err => {
              console.log('Unable to Add', err)
              callback(err, null)
            }
          )
        }
      }
    }
  })
}
exports.handle_request = handle_request
