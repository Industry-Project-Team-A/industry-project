import React from "react";
import {Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

class ProductSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      response: { images: [], categoryIds: [],
        options: [
          { name: "", type: "", choices: [] },
          { name: "", type: "", choices: [] },
          { name: "", type: "", choices: [] },
          { name: "", type: "", choices: [] },
        ],
      },
    };
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.state.response
    const sku = this.state.response.sku

    axios.put(`/api/products/${sku}`, data)
  }

  handleChange = e => {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response

    //special situation for nested arrays
    if (e.target.attributes["arrayName"]) {
      let arrayName = e.target.getAttribute("arrayName")
      let nestedValue = parseInt(e.target.getAttribute("nest"));
  
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
            for (let index = 0; index < 4; index++) {
              const element = response.options[index];
              if (typeof element === "undefined") {
                response.options.push({ name: "", type: "", choices: [] });
              }
            }
        this.setState({ response });
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(
      `/api/products/${this.props.match.params.sku}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
  const product = this.state.response

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupId">
            <Form.Label>Product Id:</Form.Label>
            <Form.Control
              name="id"
              value={product.id}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              value={product.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupSku">
            <Form.Label>Base SKU:</Form.Label>
            <Form.Control
              name="sku"
              value={product.sku}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows="4"
              name="description"
              value={product.description}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              value={product.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupEnabled">
            <Form.Label>Enabled:</Form.Label>
            <Form.Control
              as="select"
              name="enabled"
              value={product.enabled}
              onChange={this.handleChange}
              single
            >
              <option>yes</option>
              <option>no</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupShippingOnly">
            <Form.Label>Fixed Shipping Rate Only:</Form.Label>
            <Form.Control
              as="select"
              name="fixedShippingRateOnly"
              value={product.fixedShippingRateOnly}
              onChange={this.handleChange}
              single
            >
              <option>yes</option>
              <option>no</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupShipRate">
            <Form.Label>Fixed Shipping Rate:</Form.Label>
            <Form.Control
              name="fixedShippingRate"
              value={product.fixedShippingRate}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupBrand">
            <Form.Label>Brand:</Form.Label>
            <Form.Control
              name="brand"
              value={product.brand}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupCatIDs">
            <Form.Label>Category IDs:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.categoryIds.map((id) => (
                <option>{id}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>
          <Form.Group controlId="formGroupOpt1">
            <h3>Option 1</h3>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="0"
              value={product.options[0].name}
              onChange={this.handleChange}
            />
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              arrayName="options"
              nest="0"
              value={product.options[0].type}
              onChange={this.handleChange}
              single
            >
              <option></option>
              <option>SELECT</option>
              <option>CHECKBOX</option>
              <option>RADIO</option>
            </Form.Control>
            <Form.Label>Choices:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.options[0].choices.map((choice) => (
                <option>{choice}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>
          <Form.Group controlId="formGroupOpt2">
            <h3>Option 2</h3>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="1"
              value={product.options[1].name}
              onChange={this.handleChange}
            />
            <Form.Label>Type:</Form.Label>
            <Form.Control as="select" value={product.options[1].type} single>
              <option></option>
              <option>SELECT</option>
              <option>CHECKBOX</option>
              <option>RADIO</option>
            </Form.Control>
            <Form.Label>Choices:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.options[1].choices.map((choice) => (
                <option>{choice}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>
          <Form.Group controlId="formGroupOpt3">
            <h3>Option 3</h3>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="2"
              value={product.options[2].name}
              onChange={this.handleChange}
            />
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              arrayName="options"
              nest="2"
              value={product.options[2].type}
              onChange={this.handleChange}
              single
            >
              <option></option>
              <option>SELECT</option>
              <option>CHECKBOX</option>
              <option>RADIO</option>
            </Form.Control>
            <Form.Label>Choices:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.options[2].choices.map((choice) => (
                <option>{choice}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>
          <Form.Group controlId="formGroupOpt4">
            <h3>Option 4</h3>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              arrayName="options"
              nest="3"
              value={product.options[3].name}
              onChange={this.handleChange}
            />
            <Form.Label>Type:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              arrayName="options"
              nest="3"
              value={product.options[3].type}
              onChange={this.handleChange}
              single
            >
              <option></option>
              <option>SELECT</option>
              <option>CHECKBOX</option>
              <option>RADIO</option>
            </Form.Control>
            <Form.Label>Choices:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.options[3].choices.map((choice) => (
                <option>{choice}</option>
              ))}
            </Form.Control>
            <Button variant="secondary" type="add">
              Edit
            </Button>
          </Form.Group>
          <Form.Group controlId="formGroupImages">
            <Form.Label>Images:</Form.Label>
            <Form.Control as="select" multiple disabled>
              {this.state.response.images.map((image) => (
                <option>{image}</option>
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

export default ProductSingle;
