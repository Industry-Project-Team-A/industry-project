import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Products from "./screens/products/Products.jsx";
import Stores from "./screens/stores/Stores.jsx";
import Categories from "./screens/categories/Categories.jsx";
import Variations from "./screens/variations/Variations.jsx";

import ProductSingle from "./screens/products/ProductSingle.jsx";
import StoreSingle from "./screens/stores/StoreSingle.jsx";
import CategorySingle from "./screens/categories/CategorySingle.jsx";
import VariationSingle from "./screens/variations/VariationSingle.jsx";

import SuccessSubmit from "./components/SuccessSubmit.jsx"

const App = () => {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col>
            <Navbar bg="info" variant="dark" fixed="top">
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
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products/:id" component={ProductSingle} />
            <Route path="/products" component={Products} />
            <Route path="/stores/:id" component={StoreSingle} />
            <Route path="/stores" component={Stores} />
            <Route path="/variations/:id" component={VariationSingle} />
            <Route path="/variations" component={Variations} />
            <Route path="/categories/:id" component={CategorySingle} />
            <Route path="/categories" component={Categories} />
            <Route path="/success" component={SuccessSubmit} />
          </Switch>
        </Row>
      </Container>
    </Router>
  );
};

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
