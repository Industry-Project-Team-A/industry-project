import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import { Navbar, Nav } from "react-bootstrap";
import Products from './components/Products'
import CustomProducts from './components/CustomProducts'
import Stores from './components/Stores'
import Categories from './components/Categories'
import Variations from './components/Variations'
import { LinkContainer } from 'react-router-bootstrap';

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
    <Router>
      <Navbar bg = "info" variant = "dark">
        <LinkContainer to="/">
          <Navbar.Brand>Tee Commerce Database</Navbar.Brand>
        </LinkContainer>
        <Nav className = "mr-auto">
          <LinkContainer to= "/products">
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to = "/stores">
            <Nav.Link>Stores</Nav.Link>
          </LinkContainer>
          <LinkContainer to = "/categories">
            <Nav.Link>Categories</Nav.Link>
          </LinkContainer>
          <LinkContainer to = "/variations">
            <Nav.Link>Variations</Nav.Link>
          </LinkContainer>
          <LinkContainer to = "/customProducts">
            <Nav.Link>CustomProducts</Nav.Link>
          </LinkContainer>
        </Nav>
        </Navbar>
        
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route path = "/products">
            <Products />
          </Route>
          <Route path = "/stores">
            <Stores />
          </Route>
          <Route path = "/variations">
            <Variations/>
          </Route>
          <Route path = "/customProducts">
            <CustomProducts/>
          </Route>
          <Route path = "/categories">
            <Categories/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
