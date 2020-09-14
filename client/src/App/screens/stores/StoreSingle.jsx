import React from "react";
import { Form, Container, Button } from "react-router-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

class StoreSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: { productIds: [] }
    };
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.state.response
    const id = this.state.response.id

    axios.put(`/api/stores/${id}`, data)
  }

  handleChange = e => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response
    //special situation for nested arrays
    if (e.target.attributes["arrayName"]) {
      let arrayName = e.target.getAttribute("arrayName")
      let nestedValue = parseInt(e.target.getAttribute("nest"));

      formValues[arrayName][nestedValue][name] = value

      this.setState({ formValues });
      return;
    }

    formValues[name] = value;
    this.setState({ formValues })
  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response });
      })
      .catch((err) => console.log(err));
  }
  callApi = async () => {
    const response = await fetch(`/api/stores/${this.props.match.params.id}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    const store = this.state.response
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupId">
            <Form.Label>Store Id:</Form.Label>
            <Form.Control
              name="id"
              value={store.id}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              value={store.name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupTag">
            <Form.Label>Tag:</Form.Label>
            <Form.Control
              name="name"
              value={store.tag}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupApiId">
            <Form.Label>API Id: </Form.Label>
            <Form.Control
              name="apiId"
              value={store.apiId}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupToken">
            <Form.Label>Token:</Form.Label>
            <Form.Control
              name="token"
              value={store.token}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupBaseUrl">
            <Form.Label>Base Url:</Form.Label>
            <Form.Control
              name="baseUrl"
              value={store.baseUrl}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ShippingIncluded">
            <Form.Label>Shipping Included:</Form.Label>
            <Form.Control
              as="select"
              name="shippingIncluded"
              value={store.shippingIncluded}
              onChange={this.handleChange}
              single
            >
              <option>yes</option>
              <option>no</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formGroupEnabled">
            <Form.Label>Enabled:</Form.Label>
            <Form.Control
              as="select"
              name="enabled"
              value={store.enabled}
              onChange={this.handleChange}
              single
            >
              <option>yes</option>
              <option>no</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formGroupCatIDs">
            <Form.Label>Product IDs:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.productIds.map((id) => (
                <option>{id}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>

          <Form.Group controlId="formGroupLogos">
            <Form.Label>Logos:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.logos.map((logo) => (
                <option>{logo}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
            </Button>

        </Form>
      </Container>
    );
  }
}
export default StoreSingle;
