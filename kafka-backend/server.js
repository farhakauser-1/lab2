var connection = new require('./kafka/Connection')
// topics files
// var signin = require('./services/signin.js');

// var usermodel = require('./models/Users')
// var restaurant = require('./models/Restaurant')
// var order = require('./models/Orders')
// var menuSchema = require('./models/Menu')

var mongoose = require('../Backend/Mongoose.js')

var Login = require('./services/Login.js')
var UserSignUp = require('./services/UserSignUp')
var search = require('./services/search')
var UserOrders = require('./services/UserOrders')
var DisplayUserProfile = require('./services/DisplayUserProfile')
var PlaceOrder = require('./services/PlaceOrder')

var OwnerSignUp = require('./services/OwnerSignUp')
var AddCategory = require('./services/AddCategory')
var DeleteItem = require('./services/DeleteItem')
var Updateitem = require('./services/Updateitem')
var OrderStatus = require('./services/OrderStatus')
var RestaurantOrders = require('./services/RestaurantOrders')
var UpdateUserProfile = require('./services/UpdateUserprofile')
var FetchItems = require('./services/FetchItems')
var AddItems = require('./services/Add')
var DisplayOwnerProfile = require('./services/DisplayOwnerProfile')

function handleTopicRequest (topic_name, fname) {
  // var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name)
  var producer = connection.getProducer()
  console.log('server is running ')
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + ' ', fname)
    console.log(JSON.stringify(message.value))
    var data = JSON.parse(message.value)
    console.log('Calling Function')
    fname.handle_request(data.data, function (err, res) {
      console.log('after handle' + JSON.stringify(res))
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ]
      producer.send(payloads, function (err, data) {
        console.log(data)
      })
    })
  })
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('UserLogin', Login)
handleTopicRequest('UserSignUp', UserSignUp)
handleTopicRequest('search', search)
handleTopicRequest('UserOrders', UserOrders)
handleTopicRequest('DisplayUserProfile', DisplayUserProfile)
handleTopicRequest('DisplayOwnerProfile', DisplayOwnerProfile)
handleTopicRequest('PlaceOrder', PlaceOrder)
handleTopicRequest('OwnerSignUp', OwnerSignUp)
handleTopicRequest('AddCategory', AddCategory)
handleTopicRequest('DeleteItem', DeleteItem)
handleTopicRequest('OrderStatus', OrderStatus)
handleTopicRequest('RestaurantOrders', RestaurantOrders)
handleTopicRequest('UpdateUserProfile', UpdateUserProfile)
handleTopicRequest('Updateitem', Updateitem)
handleTopicRequest('FetchItems', FetchItems)
handleTopicRequest('AddItems', AddItems)
