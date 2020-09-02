import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios'


class App extends Component {
  state = {users: []}

  componentDidMount() {
    axios.get('/api/users')
      .then(response => {
        const users = response.data
        this.setState({users})
      })
  }

  render() {
    return (
    <div>
      {this.state.users.map(user => (
        <li>
          {user.name} = {user.username}
        </li>
      ))}
    </div>
    )
  }
}

export default App;
