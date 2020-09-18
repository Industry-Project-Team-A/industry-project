import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";

class CategoriesSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: { productIds: [] },
      loading: true,
      submitted: false,
    };
  }
  handleDelete = (e) => {
    e.preventDefault();

    const data = this.state.response;
    const id = data.id;

        axios.delete(`/api/categories/${id}`, data).then(
          this.setState({ submitted: true, operation: "deleted" }),
          setTimeout(() => {
            this.props.history.push("/categories");
          }, 3000)
        );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    const id = this.state.response.id;

    axios.put(`/api/variations/${id}`, data).then(
      this.setState({ submitted: true }),
      setTimeout(() => {
        this.props.history.push("/variations");
      }, 3000)
    );
  };

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response;

    //special situation for nested arrays
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
    axios.get(`/api/categories/${this.props.match.params.id}`).then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.submitted)
      return (
        <SuccessSubmit
          type="Category"
          id={this.state.response.id}
          operation="updated"
        />
      );

    const category = this.state.response;
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
          Delete Category
        </Button>
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

export default CategoriesSingle;
