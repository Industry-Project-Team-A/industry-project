import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import ContainerDefault from "../../components/ContainerDefault.jsx";
import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";

class ProductsNew extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      submitted: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;

    axios.post(`/api/products/`, data).then(
      this.setState({ submitted: true }),
      setTimeout(() => {
        this.props.history.push("/products");
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
    axios.get(`/api/products/newid`).then((res) => {
      const newId = res.data[0];
      this.setState({
        response: {
          id: newId,
          images: [],
          categoryIds: [],
          options: [
            { name: "", type: "", choices: [] },
            { name: "", type: "", choices: [] },
            { name: "", type: "", choices: [] },
            { name: "", type: "", choices: [] },
          ],
        },
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.submitted)
      return (
        <SuccessSubmit
          type="Product"
          id={this.state.response.id}
          operation="updated"
        />
      );

    const product = this.state.response;

    return (
      <ContainerDefault>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm={3}>
                  Product Id:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="id"
                    value={product.id}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupName">
                <Form.Label column sm={3}>
                  Name:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="name"
                    value={product.name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupSku">
                <Form.Label column sm={3}>
                  Base SKU:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="sku"
                    value={product.sku}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupDescription">
                <Form.Label column sm={3}>
                  Description:
                </Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="description"
                    value={product.description}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupPrice">
                <Form.Label column sm={3}>
                  Price:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="price"
                    value={product.price}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupEnabled">
                <Form.Label column sm={3}>
                  Enabled:
                </Form.Label>
                <Col>
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
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupShippingOnly">
                <Form.Label column sm={3}>
                  Fixed Shipping Rate Only:
                </Form.Label>
                <Col>
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
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupShipRate">
                <Form.Label column sm={3}>
                  Fixed Shipping Rate:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="fixedShippingRate"
                    value={product.fixedShippingRate}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupBrand">
                <Form.Label column sm={3}>
                  Brand:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="brand"
                    value={product.brand}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupCatIDs">
                <Form.Label column sm={3}>
                  Category IDs:
                </Form.Label>
                <Col>
                  <Form.Control as="select" multiple disabled>
                    {this.state.response.categoryIds.map((id) => (
                      <option>{id}</option>
                    ))}
                  </Form.Control>
                  <div className="float-right">
                    <Button variant="secondary" type="add">
                      Edit
                    </Button>
                  </div>
                </Col>
              </Form.Group>
            </Col>
          </Row>

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
          <Row>
            <Button
              className="shadow-sm rounded ml-2"
              variant="primary"
              type="submit"
            >
              <span className="pull-left">Save </span>
              <FontAwesomeIcon className="ml-2" icon={faSave} />
            </Button>
            <Button
              className="shadow-sm rounded ml-2"
              variant="danger"
              type="button"
              onClick={(e) => {
                this.props.history.goBack();
              }}
            >
              <span className="pull-left">Cancel </span>
              <FontAwesomeIcon className="ml-2" icon={faWindowClose} />
            </Button>
          </Row>
        </Form>
      </ContainerDefault>
    );
  }
}

export default ProductsNew;
