import React, { Component } from 'react'
import cookie from 'react-cookies'
// import Bootstrap from "react-bootstrap";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { ROOT_URL } from '../URL'

export default class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: '',
      EmailID: '',
      password: '',
      Phone: '',
      userid: localStorage.getItem('userid')
    }
    this.submitUserProfile = this.submitUserProfile.bind(this)
    this.NameChangeHandler = this.NameChangeHandler.bind(this)
    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.PhoneChangeHandler = this.PhoneChangeHandler.bind(this)
  }
  componentDidMount () {
    let x = localStorage.getItem('userid')
    console.log(x)
    console.log('InDID Mount')
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('JWT')
    // axios.defaults.headers.common = {
    // authorization: `Bearer ` + localStorage.getItem('JWT')
    // }
    console.log(localStorage.getItem('JWT'))
    axios
      .get(`${ROOT_URL}/userprofile/${this.state.userid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        console.log('populate')
        console.log(response.data)
        var values = response.data
        this.setState({
          Name: values.username,
          EmailID: values.email,
          password: values.password,
          Phone: values.phoneNumber,
          userid: localStorage.getItem('userid')
        })
      })
      .catch(() => {
        console.log('Hello')
        localStorage.removeItem('auth')
        this.props.history.push('/buyer/login')
      })
  }
  // Name change handler to update state variable with the text entered by the user
  NameChangeHandler = e => {
    this.setState({
      Name: e.target.value
    })
  }
  EmailIDChangeHandler = e => {
    this.setState({
      EmailID: e.target.value
    })
  }
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    })
  }
  PhoneChangeHandler = e => {
    this.setState({
      Phone: e.target.value
    })
  }
  submitUserProfile = e => {
    // prevent page from refresh
    e.preventDefault()
    const data = {
      userid: localStorage.getItem('userid'),
      Name: this.state.Name,
      EmailID: this.state.EmailID,
      password: this.state.password,
      Phone: this.state.Phone
    }
    console.log('In update')
    axios
      .post(`${ROOT_URL}/updateuserprofile`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        // update the state with the response data
        console.log('updated user profile' + JSON.stringify(response.data))

        this.props.history.push('/buyer/userprofile')
      })
      .catch(() => {
        console.log('Hello')
        localStorage.removeItem('auth')
        this.props.history.push('/buyer/login')
      })
    {
    }
  }

  render () {
    const existsFlag = this.state.existsFlag
    let redirectVar = null
    if (!cookie.load('cookie')) {
      redirectVar = <Redirect to='/buyer/login' />
    }
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Your profile</h1>
          <form action='http://localhost:3000/buyer'>
            <img
              src='https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg'
              width='100'
              height='100'
            />

            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Name'
                value={this.state.Name}
                onChange={this.NameChangeHandler}
                placeholder='Name'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='email'
                value={this.state.EmailID}
                className='form-control'
                name='EmailID'
                onChange={this.EmailIDChangeHandler}
                placeholder='EmailID'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='password'
                className='form-control'
                name='password'
                value={this.state.password}
                onChange={this.passwordChangeHandler}
                placeholder='password'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='number'
                className='form-control'
                name='Phone'
                value={this.state.Phone}
                onChange={this.PhoneChangeHandler}
                placeholder='Phone'
              />
            </div>
            <br />
            <div>{existsFlag ? 'Book ID exists ' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button
                className='btn btn-success'
                onClick={this.submitUserProfile}
              >
                Update Profile
              </button>
              <br />
            </div>
            <div style={{ width: '30%' }}>
              <button className='btn btn-success' type='submit'>
                Home
              </button>
            </div>
            <br />
          </form>
        </div>
      </div>
    )
  }
}
