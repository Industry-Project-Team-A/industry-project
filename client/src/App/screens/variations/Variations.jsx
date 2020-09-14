import React from "react";
import { Table, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader.jsx"

class Variations extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('api/variations')
    .then(res => {
      const response = res.data
      this.setState({ response, loading: false });
    })
      
  }

  render() {
    if (this.state.loading) return (
      <Loader />
    );
    return (
      <Col style={{ padding: "70px" }}>
        <h1 className="text-center">Variations</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full SKU</th>
              <th>Parent Product ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((variation) => (
              <tr>
                <td key={variation._id}>
                  <LinkContainer to={`/variations/${variation.id}`}>
                    <a>{variation.id}</a>
                  </LinkContainer>
                </td>
                <td key={variation._id}> {variation.sku} </td>
                <td key={variation._id}>{variation.productId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default Variations;
