import React from "react";
import {Form, Container, Button } from "react-bootstrap";
import axios from "axios";

class CategorySingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: {productIds: []}
    };
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.state.response
    const id = this.state.response.id

    axios.put(`/api/categories/${id}`, data)
  }

  handleChange = e => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response

    //special situation for nested arrays
    if (e.target.attributes["arrayName"]) {
      let arrayName = e.target.getAttribute("arrayName")
      let nestedValue = parseInt(e.target.getAttribute("nest"), 10);
  
      formValues[arrayName][nestedValue][name] = value

      this.setState({ formValues });
      return;
    }

    formValues[name] = value;
    this.setState({formValues})

  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response });
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/categories/${this.props.match.params.id}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const category = this.state.response
      return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupId">
            <Form.Label>Category Id:</Form.Label>
            <Form.Control
              name="id"
              value={category.id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              value={category.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupSku">
            <Form.Label>Parent Id: </Form.Label>
            <Form.Control
              name="parentId"
              value={category.parentId}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Label>Order By:</Form.Label>
            <Form.Control
              name="orderBy"
              value={category.orderBy}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupEnabled">
            <Form.Label>Enabled:</Form.Label>
            <Form.Control
              as="select"
              name="enabled"
              value={category.enabled}
              onChange={this.handleChange}
              single
            >
              <option>yes</option>
              <option>no</option>
            </Form.Control>

            <Form.Group controlId="formGroupCatIDs">
            <Form.Label>Product IDs:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.productIds.map((id) => (
                <option>{id}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>

            </Form.Group>
            <Button variant="primary" type="submit">
            Save
            </Button>
          
        </Form>
      </Container>
    );
  }
}

export default CategorySingle;
