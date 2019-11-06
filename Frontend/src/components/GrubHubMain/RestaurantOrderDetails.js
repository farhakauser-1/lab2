import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'material-ui'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { ROOT_URL } from '../../URL'

class RestaurantOrderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: 1,
      searchtext: '',
      item: [],
      failed: '',
      currentPage: 1,
      todosPerPage: 3
    }
    this.itemsearch = this.itemsearch.bind(this)
    this.search = this.search.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  /* async componentDidMount() {
    var x = [];
    console.log("search clicked");
    await axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log("Onclick");
        console.log(response.data);
        var y = response.data.length;
        for (let i = 0; i < y; i++) x.push(JSON.stringify(response.data[i]));
      });
    console.log("Here" + this.state.item);
    this.setState({ item: x });
  } */
  handleClick (event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }
  itemsearch = e => {
    this.setState({ searchtext: e.target.value })
    console.log(this.state.searchtext)
  }
  GotoRestDetails = e => {
    e.preventDefault()
    localStorage.setItem('SelectedRestaurant', e.target.value)
    this.props.history.push('/buyer/restdetails')
  }
  async search (e) {
    e.preventDefault()
    console.log('search clicked')
    var x = []
    console.log('search clicked')
    await axios
      .get(`${ROOT_URL}/search/${this.state.searchtext}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
      })
      .then(response => {
        console.log('Onclick')
        console.log(response.data)
        if (response.data == 'No Such item') {
          this.setState({ failed: 'true' })
        } else {
          var y = response.data.length
          for (let i = 0; i < y; i++) {
            x.push(JSON.stringify(response.data[i]))
            console.log(response.data[i].RestaurantName)
          }
        }
      })
      .catch(() => {
        console.log('Hello')
        localStorage.removeItem('auth')
        localStorage.removeItem('JWT')
        this.props.history.push('/buyer/login')
      })
    console.log('Here' + this.state.item)
    this.setState({ item: x })
    console.log(this.props)
  }

  render () {
    let redirectVar = null
    if (localStorage.getItem('auth') == 'true') {
      console.log('checking redirection')
      console.log(cookie.load('cookie'))
      redirectVar = 'yes'
    }
    console.log('Should be empty' + this.state.item)
    var failed = null
    if (this.state.failed == 'true') {
      failed = 'No Such item'
    }

    const { item, currentPage, todosPerPage } = this.state
    /*  if (!cookie.load('cookie')) {
      console.log('checking redirection')
      redirectVar = <Redirect to='/buyer/login' />
    } */
    const indexOfLastTodo = currentPage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    console.log(item)
    console.log(indexOfFirstTodo + '+hjgj' + indexOfLastTodo)
    const currentTodos = item.slice(indexOfFirstTodo, indexOfLastTodo)
    console.log('currentTodos' + currentTodos)
    const renderTodos = currentTodos.map((it, index) => {
      return (
        <li>
          {currentTodos.index}
          <button
            className='table table-light m-3'
            id={JSON.parse(it).restid}
            value={JSON.parse(it).RestaurantName}
            onClick={this.GotoRestDetails}
          >
            {JSON.parse(it).RestaurantName}
          </button>
        </li>
      )
    })
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(item.length / todosPerPage); i++) {
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
        <div>
          {redirectVar != 'yes'
            ? this.props.history.push('/buyer/login')
            : null}
          <div class='jumbotron'>
            <nav class='navbar navbar-light bg-light'>
              <form class='form-inline'>
                <input
                  class='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={this.itemsearch}
                />

                <button
                  class='btn btn-outline-success my-2 my-sm-0'
                  type='submit'
                  onClick={this.search}
                >
                                          Search
                </button>
              </form>
            </nav>
          </div>
          <p />
        </div>
        <p> {failed}</p>
        <h2>Item Details</h2>;
        <div>
          {renderTodos}
          {renderPageNumbers}
        </div>
      </div>
    )
  }
}

export default RestaurantOrderDetails
