import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Products from "./components/Products";
import CustomProducts from "./components/CustomProducts";
import Stores from "./components/Stores";
import Categories from "./components/Categories";
import Variations from "./components/Variations";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="info" variant="dark">
          <LinkContainer to="/">
            <Navbar.Brand>Tee Commerce Database</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stores">
              <Nav.Link>Stores</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/categories">
              <Nav.Link>Categories</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/variations">
              <Nav.Link>Variations</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customProducts">
              <Nav.Link>CustomProducts</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/stores">
            <Stores />
          </Route>
          <Route path="/variations">
            <Variations />
          </Route>
          <Route path="/customProducts">
            <CustomProducts />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/products/:sku" component = {Child}>
            <ProductSingle sku={sku} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;