import React from "react";
import { Table, Container } from "react-bootstrap";
//import{Component}
//class ...extends Component
//follow the template put super() in it
//read react component in open source

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
  //async we are waiting
  //wait for the fetch to run
  //when result comes back , going into response
  callApi = async () => {
    const response = await fetch("/api/products");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Product</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>Sku</th>
              <th>Name</th>
              <th>Price</th>
              <th>Is shipping required</th>
              <th>categoryIds</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((product) => (
              <tr>
                <td key={product.key}> {product.sku} </td>
                <LinkContainer 
                key = {product.key} > {product.name}
                </LinkContainer> 
                <td key={product.key}> {product.price} </td>
                <td key={product.key}> {product.isShippingRequired} </td>
                <td key={product.key}> {product.categoryIds} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Products;
