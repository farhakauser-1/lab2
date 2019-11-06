var usermodel = require('../../Backend/models/Users')
function handle_request (msg, callback) {
  console.log('User Profile')
  console.log(msg)
  usermodel.findOne({ _id: msg.userid }, function (err, doc) {
    if (err) {
      console.log('error')
    } else {
      doc.username = msg.Name
      doc.email = msg.EmailID
      doc.password = msg.password
      doc.phoneNumber = msg.Phone

      doc.save().then(
        updateddoc => {
          console.log('User details Updated successfully.', updateddoc)
          callback(null, doc)
        },
        err => {
          console.log('Unable to save user details.', err)
          callback(err, null)
        }
      )
    }
  })
}
exports.handle_request = handle_request
