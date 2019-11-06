import React, { Component } from 'react'
import cookie from 'react-cookies'
// import Bootstrap from "react-bootstrap";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { ROOT_URL } from '../../URL'

export default class OwnerProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Name: '',
      EmailID: '',
      password: '',
      Phone: '',
      restid: localStorage.getItem('restid')
    }
    this.submitUserProfile = this.submitUserProfile.bind(this)
    this.NameChangeHandler = this.NameChangeHandler.bind(this)
    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
    this.PhoneChangeHandler = this.PhoneChangeHandler.bind(this)
  }
  componentDidMount () {
    let x = localStorage.getItem('RestaurantName')
    console.log(x)
    console.log('InDID Mount')
    axios
      .get(`${ROOT_URL}/ownerprofile/${x}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        console.log('populate')
        console.log(response.data)
        var values = response.data
        this.setState({
          Name: response.data.username,
          EmailID: response.data.email,
          password: response.data.password,
          Phone: values.phoneO,
          restid: localStorage.getItem('restid')
        })
      })
      .catch(() => {
        console.log('Hello')
        this.props.history.push('/owner/ownerlogin')
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
      restid: localStorage.getItem('restid'),
      Name: this.state.Name,
      EmailID: this.state.EmailID,
      password: this.state.password,
      Phone: this.state.Phone
    }
    console.log('In update')
    axios
      .post(`${ROOT_URL}/updateowner`, data)
      .then(response => {
        // update the state with the response data

        console.log('updated user profile' + response.data[0])
        this.props.history.push('/owner/ownerprofile')
      })
      .catch(() => {
        console.log('Hello')
        this.props.history.push('/owner/ownerlogin')
      })
  }

  render () {
    const existsFlag = this.state.existsFlag
    let redirectVar = null
    if (!cookie.load('owner')) {
      redirectVar = <Redirect to='/owner/ownerlogin' />
    }
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Your profile</h1>
          <form action='http://localhost:3000/owner/'>
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
