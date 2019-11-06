import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class OwnerNavbar extends Component {
  state = {}
  handleLogout = () => {
    console.log('Deleting Cookie')
    cookie.remove('cookie', { path: '/' })
    cookie.remove('owner', { path: '/' })
    localStorage.setItem('auth', 'false')
    localStorage.removeItem('auth')
    localStorage.removeItem('JWT')
  }
  render () {
    // if Cookie is set render Logout Button
    let navLogin = null
    let signup = null

    if (localStorage.getItem('auth') == 'true') {
      console.log('Able to read cookie')
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <Link to='/owner/ownerlogin' onClick={this.handleLogout}>
              <span class='glyphicon glyphicon-user' />
              Logout
            </Link>
          </li>
        </ul>
      )
    } else {
      // Else display login button

      console.log('Not Able to read cookie')
      signup = (
        <li class='nav-item'>
          <a class='nav-link' href='/owner/owner'>
            SignUp
          </a>
        </li>
      )
      navLogin = (
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <Link to='/owner/ownerlogin'>
              <span class='glyphicon glyphicon-log-in' /> Login
            </Link>
          </li>
        </ul>
      )
    }
    return (
      <div>
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
          <a class='navbar-brand' href='#'>
            <font color='red'> GRUBHUB </font>
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon' />
          </button>

          <div
            class='collapse navbar-collapse'
            id='navbarSupportedContent'
            align='right'
          >
            <ul class='navbar-nav mr-auto'>
              <li class='nav-item active'>
                <a class='nav-link' href='/owner'>
                  Home <span class='sr-only'>(current)</span>
                </a>
              </li>
              {signup}
              <li class='nav-item dropdown'>
                <a
                  class='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Actions
                </a>
                <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <a class='dropdown-item' href='/owner/ownerprofile'>
                    Profile
                  </a>
                  <a class='dropdown-item' href='/owner/additems'>
                    Items Offered
                  </a>
                  <div class='dropdown-divider' />
                  <a class='dropdown-item' href='/owner/allorderstorest'>
                    ORDER STATUS
                  </a>
                </div>
              </li>
            </ul>
          </div>
          {navLogin}
        </nav>
      </div>
    )
  }
}

export default OwnerNavbar
