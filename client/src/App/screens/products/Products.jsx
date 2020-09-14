import React from "react";
import { Table, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader.jsx";

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("api/products").then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <Col style={{ padding: "70px" }}>
        <h1 className="text-center">Product</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sku</th>
              <th>Name</th>
              <th>Price</th>
              <th>Enabled</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((product) => (
              <tr key={product.id.concat(product._id)}>
                <td key={product.id}>
                  <LinkContainer to={`/products/${product.id}`}>
                    <a>{product.id}</a>
                  </LinkContainer>
                </td>
                <td key={product.sku}> {product.sku} </td>
                <td key={product.name}> {product.name} </td>
                <td key={product.price.toString().concat(product._id)}>
                  {" "}
                  {product.price}{" "}
                </td>
                <td key={product.enabled.toString().concat(product._id)}>
                  {" "}
                  {product.enabled}{" "}
                </td>
                <td key={product._id}> {product.brand} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default Products;
