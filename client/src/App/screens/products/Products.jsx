import React from "react";
import { Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response });
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/products");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Container>
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
              <tr>
                <td key={product._id}>
                  <LinkContainer to={`/products/${product.id}`}>
                    <a>{product.id}</a>
                  </LinkContainer>
                </td>
                <td key={product._id}> {product.sku} </td>
                <td key={product._id}> {product.name} </td>
                <td key={product._id}> {product.price} </td>
                <td key={product._id}> {product.enabled} </td>
                <td key={product._id}> {product.brand} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Products;
