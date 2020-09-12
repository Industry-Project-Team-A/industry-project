import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Products from "./screens/products/Products.jsx";
import CustomProducts from "./screens/customProducts/CustomProducts.jsx";
import Stores from "./screens/stores/Stores.jsx";
import Categories from "./screens/categories/Categories.jsx";
import Variations from "./screens/variations/Variations.jsx";

import ProductSingle from "./screens/products/ProductSingle.jsx";
import StoreSingle from "./screens/stores/StoreSingle.jsx";
import CategorySingle from "./screens/categories/CategorySingle.jsx";
import VariationSingle from "./screens/variations/VariationSingle.jsx";

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
            <Route exact path="/" component={Home} />
            <Route path="/products/:sku" component={ProductSingle} />
            <Route path="/products" component={Products} />
            <Route path="/stores/:tag" component={StoreSingle} />
            <Route path="/stores" component={Stores} />
            <Route path="/variations/:id" component={VariationSingle} />
            <Route path="/variations" component={Variations} />
            <Route path="/customProducts" component={CustomProducts} />
            <Route path="/categories/:id" component={CategorySingle} />
            <Route path="/categories" component={Categories} />
          </Switch>
      </div>
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
