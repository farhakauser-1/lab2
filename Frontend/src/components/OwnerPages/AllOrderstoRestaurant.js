import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { ROOT_URL } from '../../URL'
class AllOrderstoRestaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nameOfRestaurant: localStorage.getItem('RestaurantName'),
      list: [],
      items: [],
      selectValue: ''
    }
    this.getdetails = this.getdetails.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.Message = this.Message.bind(this)
  }
  componentDidMount () {
    axios
      .get(`${ROOT_URL}/allrestorders/${this.state.nameOfRestaurant}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        this.setState({ list: response.data })
      })
      .catch(() => {
        console.log('Hello')
        localStorage.removeItem('auth')
        this.props.history.push('/owner/ownerlogin')
      })
  }
  getdetails (it) {
    var items = []
    console.log(it.username)
    var x = JSON.parse(it.cart)
    console.log(x)

    for (let i = 0; i < x.length; i++) {
      if (x[i].count != 0) {
        console.log(x[i].item)
        var data = {
          item: x[i].item,
          count: x[i].count,
          change: 'false'
        }
        items.push(data)
      }
    }
    this.setState({ items })
  }
  handleChange = e => {
    e.preventDefault()
    console.log(e.target.id)
    this.setState({ selectValue: e.target.id })
    var data = {
      orderstatus: e.target.value,
      _id: e.target.id
    }

    console.log(data)
    axios
      .post(`${ROOT_URL}/updateorderstatus/`, data)
      .then(response => {
        console.log('updateorderstatus')
        console.log(response.data)
        console.log(this.state.change)
        setTimeout(() => {}, 3000)

        this.setState({ change: 'false' })
      })
      .catch(() => {
        console.log('Hello')
        localStorage.removeItem('auth')
        this.props.history.push('/owner/ownerlogin')
      })
    window.location.reload()
  }
  Message (it) {
    localStorage.setItem('orderid', it._id)
    this.props.history.push('/owner/message')
  }
  render () {
    let redirectVar = null

    if (!cookie.load('owner')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/owner/ownerlogin' />
    }

    return (
      <div>
        <table class='table'>
          <thead class='thead-dark'>
            <tr>
              <th scope='Restaurant'>ORDERID</th>
              <th>PLACED BY </th>
              <th>ORDER STATUS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(it => (
              <tr>
                <td>{it._id}</td>
                <td>{it.username}</td>
                <td>{it.orderStatus}</td>
                <td>
                  <button
                    id={it._id}
                    className='btn btn-danger m-2'
                    onClick={() => this.getdetails(it)}
                  >
                                        GET ORDER DETAILS
                  </button>
                </td>
                <td>
                  {' '}
                  <button
                    id={it._id}
                    className='btn-danger m-2'
                    onClick={() => this.Message(it)}
                    align='center'
                  >
                       MESSAGE BUYER
                  </button>
                </td>
                <td>
                  <select
                    id={it._id}
                    placeholder='Order Status'
                    class='class="btn btn-warning'
                    value={this.state.selectValue}
                    onChange={this.handleChange}
                  >
                    <option value='Placed'>Placed</option>
                    <option value='Cancel'>Cancel</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class='table table-dark'>
          {this.state.items.map(it => (
            <tr>
              <td>{it.item}</td>
              <td>{it.count}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

export default AllOrderstoRestaurant
