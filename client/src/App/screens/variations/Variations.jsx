import React from "react";
import { Table, Container, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

//import{Component}
//class ...extends Component
//follow the template put super() in it
//read react component in open source

class Variations extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true
    };
  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response })
        this.setState({ loading: false});
      })
      .catch((err) => console.log(err));
  }
  //async we are waiting
  //wait for the fetch to run
  //when result comes back , going into response
  callApi = async () => {
    const response = await fetch("/api/variations");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const style = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
    if (this.state.loading) return (
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#303030" }}
      >
        <div style={style}>
          <Spinner animation="border" variant="info">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
    return (
      <Container>
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
      </Container>
    );
  }
}

export default Variations;
