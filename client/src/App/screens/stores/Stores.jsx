import React from "react";
import { Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//import{Component}
//class ...extends Component
//follow the template put super() in it
//read react component in open source

class Stores extends React.Component {
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
    const response = await fetch("/api/stores");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">Stores</h1>
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
                  {" "}
                  <a href="{store.baseUrl}">{store.baseUrl}</a>{" "}
                </td>
                <td key={store._id}> {store.shippingIncluded} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Stores;