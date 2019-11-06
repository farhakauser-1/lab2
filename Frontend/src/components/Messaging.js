import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { ROOT_URL } from '../URL'

class Messaging extends Component {
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component

    this.state = {
      interval: '',
      orderid: localStorage.getItem('orderid'),
      list: {},
      chat: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.chat = this.chat.bind(this)
  }
  async componentDidMount () {
    axios
      .get(`${ROOT_URL}/allmessages/${this.state.orderid}`, {
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
        this.props.history.push('/buyer/login')
      })

    console.log(this.state.list + 'here')
    this.state.interval = setInterval(() => {
      console.log('attemptimg to refresh' + Date.now())
      this.componentDidMount()
    }, 60000)
  }
  componentWillUnmount () {
    clearInterval(this.state.interval)
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(event.target.id)
  }
  chat = e => {
    e.preventDefault()
    if (this.state.chat) {
      var x = localStorage.getItem('username') + ':' + this.state.chat
      console.log(x)
      let holder = this.state.list
      holder.Messages.push(x)
      this.setState({ list: holder })
      var data = {
        orderid: this.state.orderid,
        Messages: this.state.list.Messages
      }
      console.log(data)
      axios
        .post(`${ROOT_URL}/savemessages/`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
        })
        .then(response => {
          console.log('Onclick')
          console.log(response.data)
        })
        .catch(() => {
          console.log('Hello')
          localStorage.removeItem('auth')
          this.props.history.push('/buyer/login')
        })
    }
  }
  render () {
    return (
      <div class='jumbotron'>
        <form>
          <table class='card'>
            {this.state.list.Messages
              ? this.state.list.Messages.map(msg => <li>{msg}</li>)
              : null}
          </table>
          <input
            id='chat'
            type='text'
            required
            placeholder='Chat'
            value={this.state.chat}
            onChange={this.handleChange}
          />
          <button
            className='btn btn-primary m-2'
            onClick={this.chat}
            type='submit'
          >
            CHAT
          </button>
        </form>
        <a href='/buyer/orderdetails' class='btn btn-primary'>
          HOME
        </a>
      </div>
    )
  }
}
export default Messaging
