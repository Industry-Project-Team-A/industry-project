import React from "react";
import { Table, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader.jsx";

class Stores extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("api/stores").then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <Col style={{ padding: "70px" }}>
        <h1 className="text-center">Stores</h1>

        <LinkContainer to={`/stores/new`}>
          <Button variant="primary" type="newStore">
            New Store
          </Button>
        </LinkContainer>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tag</th>
              <th>Name</th>
              <th>URL</th>
              <th>Shipping Included</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((store) => (
              <tr>
                <td key={store._id}>
                  <LinkContainer to={`/stores/${store.id}`}>
                    <a>{store.id}</a>
                  </LinkContainer>
                </td>
                <td key={store._id}> {store.tag} </td>
                <td key={store._id}> {store.name} </td>
                <td key={store._id}>
                  <a href={store.baseUrl}>{store.baseUrl}</a>
                </td>
                <td key={store._id}> {store.shippingIncluded} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default Stores;
