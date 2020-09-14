import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import Loader from "../../components/Loader.jsx";
import axios from "axios";

class VariationSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: {
        options: [
          { name: "", value: "" },
          { name: "", value: "" },
        ],
      },
      loading: true,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    const id = this.state.response.id;

    axios.put(`/api/variations/${id}`, data);
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
    axios.get(`/api/variations/${this.props.match.params.id}`).then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    const variation = this.state.response;
    return (
      <Col style={{ padding: "70px" }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupId">
            <Form.Label>Variation Id:</Form.Label>
            <Form.Control
              name="id"
              value={variation.id}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupSku">
            <Form.Label>Full SKU:</Form.Label>
            <Form.Control
              name="sku"
              value={variation.sku}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupProductId">
            <Form.Label>Parent Product ID:</Form.Label>
            <Form.Control
              name="productId"
              value={variation.productId}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupUnlimited">
            <Form.Label>Unlimited Quantity: </Form.Label>
            <Form.Control
              name="unlimited"
              value={variation.unlimited}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupOption1Name">
            <h3>Option 1</h3>
            <Form.Label>Option Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="0"
              value={variation.options[0].name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupOption1Value">
            <Form.Label>Option Value:</Form.Label>
            <Form.Control
              name="value"
              arrayName="options"
              nest="0"
              value={variation.options[0].value}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupOption1Name">
            <h3>Option 2</h3>
            <Form.Label>Option Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="1"
              value={variation.options[1].name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formGroupOption1Value">
            <Form.Label>Option Value:</Form.Label>
            <Form.Control
              name="value"
              arrayName="options"
              nest="1"
              value={variation.options[1].value}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    );
  }
}
export default VariationSingle;
