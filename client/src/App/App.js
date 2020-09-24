import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col , Image} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ScrollIntoView from "./helpers/ScrollIntoView.jsx";


import Products from "./screens/products/Products.jsx";
import Stores from "./screens/stores/Stores.jsx";
import Categories from "./screens/categories/Categories.jsx";
import Variations from "./screens/variations/Variations.jsx";

import ProductsSingle from "./screens/products/ProductsSingle.jsx";
import StoresSingle from "./screens/stores/StoresSingle.jsx";
import CategoriesSingle from "./screens/categories/CategoriesSingle.jsx";
import VariationsSingle from "./screens/variations/VariationsSingle.jsx";

import ProductsNew from "./screens/products/ProductsNew.jsx";
import StoresNew from "./screens/stores/StoresNew.jsx";
import CategoriesNew from "./screens/categories/CategoriesNew.jsx";

import ErrorPage from "./components/ErrorPage.jsx"

class App extends React.Component {
  render() {
    return (
      <Router>
        <ScrollIntoView>
          <Container fluid>
            <Row>
              <Col>
                <Navbar bg="info" variant="dark" fixed="top" expand="sm">
                  <LinkContainer to="/">
                    <Navbar.Brand>
                      <Image
                        style={{ height: "50px" }}
                        fluid
                        src="./logo.png"
                      />
                      <span> Database Manager</span>
                    </Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="response-navbar-nav">
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
                  </Navbar.Collapse>
                </Navbar>
              </Col>
            </Row>
            <Row>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={ErrorPage} />
                <Route path="/products/new" component={ProductsNew} />
                <Route path="/products/:id" component={ProductsSingle} />
                <Route path="/products" component={Products} />
                <Route path="/stores/new" component={StoresNew} />
                <Route path="/stores/:id" component={StoresSingle} />
                <Route path="/stores" component={Stores} />
                <Route path="/variations/:id" component={VariationsSingle} />
                <Route path="/variations" component={Variations} />
                <Route path="/categories/new" component={CategoriesNew} />
                <Route path="/categories/:id" component={CategoriesSingle} />
                <Route path="/categories" component={Categories} />
              </Switch>
            </Row>
          </Container>
        </ScrollIntoView>
      </Router>
    );
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
