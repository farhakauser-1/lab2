// import '../../App.css'
import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import Draggable from 'react-draggable'

import { ROOT_URL } from '../../URL'
class UserOrderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: localStorage.getItem('username'),
      list: [],
      items: [],
      selectValue: '',
      currentPage: 1,
      todosPerPage: 3
    }
    this.getdetails = this.getdetails.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.Message = this.Message.bind(this)
  }
  componentDidMount () {
    axios
      .get(`${ROOT_URL}/userorders/${this.state.username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        this.setState({ list: response.data })
      })
      .catch(() => {
        console.log('Hello')
        this.props.history.push('/buyer/login')
        localStorage.removeItem('auth')
      })
  }
  handleClick (event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }
  Message (it) {
    localStorage.setItem('orderid', it._id)
    this.props.history.push('/buyer/message')
  }
  getdetails (it) {
    var items = []
    console.log(it.cart)
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

  render () {
    let redirectVar = null
    const { list, currentPage, todosPerPage } = this.state
    /*  if (!cookie.load('cookie')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/buyer/login' />
    } */
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo)
    const renderTodos = currentTodos.map((todo, index) => {
      return (
        <div>
          <li key={todo._id}>
            <div>
              <Draggable>
                <div class='card bg-info'>
                  <div class='card-header'>Order-Id {todo._id}</div>
                  <div class='card-body'>
                    <h5 class='card-title'>
                      RESTAURANT :{todo.RestaurantName}
                    </h5>
                    <p class='card-text'>STATUS :{todo.orderStatus}</p>

                    <button
                      id={todo._id}
                      className='btn-danger m-2'
                      onClick={() => this.getdetails(todo)}
                    >
                         GET ORDER DETAILS
                    </button>

                    <button
                      id={todo._id}
                      className='btn-danger m-2'
                      onClick={() => this.Message(todo)}
                      align='center'
                    >
                         MESSAGE RESTAURANT
                    </button>
                  </div>
                  <div class='card-footer text-muted' />
                </div>
              </Draggable>
            </div>
          </li>
        </div>
      )
    })
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(list.length / todosPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <span key={number} id={number} onClick={this.handleClick}>
          {'      ' + number}
        </span>
      )
    })

    return (
      <div>
        {redirectVar}
        <ul>{renderTodos}</ul>

        <table class='table table-dark'>
          {this.state.items.map(it => (
            <tr>
              <td m-2>{it.item}</td>
              <td>{it.count}</td>
            </tr>
          ))}
        </table>
        <ul id='page-numbers'>Pages>>{renderPageNumbers}</ul>
      </div>
    )
  }
}

export default UserOrderDetails
