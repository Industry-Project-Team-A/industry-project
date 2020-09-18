import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";

class StoresSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: {
        logos: [],
      },
      loading: true,
      submitted: false,
    };
  }
  handleDelete = (e) => {
    e.preventDefault();

    const data = this.state.response;
    const id = data.id;

    axios.delete(`/api/stores/${id}`, data).then(
      this.setState({ submitted: true, operation: "deleted" }),
      setTimeout(() => {
        this.props.history.push("/stores");
      }, 3000)
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    const id = this.state.response.id;

    axios.put(`/api/stores/${id}`, data).then(
      this.setState({ submitted: true }),
      setTimeout(() => {
        this.props.history.push("/stores");
      }, 3000)
    );
  };

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response;
    //special situation for nested arrays
    if (e.target.attributes["arrayName"]) {
      let arrayName = e.target.getAttribute("arrayName");
      let nestedValue = parseInt(e.target.getAttribute("nest"), 10);

      formValues[arrayName][nestedValue][name] = value;
      this.setState({ formValues });
      return;
    }
    formValues[name] = value;
    this.setState({ formValues });
  };

  componentDidMount() {
    axios.get(`/api/stores/${this.props.match.params.id}`).then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.submitted)
      return (
        <SuccessSubmit
          type="Store"
          id={this.state.response.id}
          operation="updated"
        />
      );

    const store = this.state.response;
    return (
      <Container
        className="bg-light vh-100"
        fluid
        style={{
          paddingTop: "90px",
          paddingleft: "15px",
          paddingRight: "15px",
        }}
      >
        <Button variant="danger" type="delete" onClick={this.handleDelete}>
          Delete Store
        </Button>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupId">
            <Form.Label>Store Id:</Form.Label>
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
              name="tag"
              value={store.tag}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupApiId">
            <Form.Label>API Username: </Form.Label>
            <Form.Control
              name="apiId"
              value={store.apiId}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupToken">
            <Form.Label>API Token:</Form.Label>
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
            <Form.Label>Shipping Included:</Form.Label>
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

          <Form.Group controlId="formGroupLogos">
            <Form.Label>Logos:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.logos.map((logo) => (
                <option key={logo}>{logo}</option>
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

export default StoresSingle;
