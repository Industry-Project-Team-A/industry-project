import React from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faDirections } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";

class VariationsSingle extends React.Component {
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
    const id = this.state.response.id;

    axios
      .put(`/api/variations/${id}`, data)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          this.setState({ submitted: true }),
            setTimeout(() => {
              this.props.history.push("/variations");
            }, 3000);
        }
      });
  };

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response;
    //special situation for nested arrays
    if (e.target.attributes["arrayname"]) {
      let arrayname = e.target.getAttribute("arrayname");
      let nestedValue = parseInt(e.target.getAttribute("nest"), 10);

      formValues[arrayname][nestedValue][name] = value;

      this.setState({ formValues });
      return;
    }

    formValues[name] = value;
    this.setState({ formValues });
  };

  componentDidMount() {
    axios
      .get(`/api/variations/${this.props.match.params.id}`)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          const response = res.data;
          if (!response["options"][1]) {
            response["options"][1] = { name: "", value: "" };
          }
          this.setState({ response, loading: false });
        }
      });
  }

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.submitted)
      return (
        <SuccessSubmit
          type="Variation"
          id={this.state.response.id}
          operation="updated"
        />
      );

    const variation = this.state.response;
    return (
      <ContainerDefault>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm="3">
                  Variation ID:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
                    name="id"
                    value={variation.id}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupSku">
                <Form.Label column sm={3}>
                  Full SKU:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
                    name="sku"
                    value={variation.sku}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupProductId">
                <Form.Label column sm={3}>
                  Product ID:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
                    name="productId"
                    value={variation.productId}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupUnlimited">
                <Form.Label column sm={3}>
                  Qty Unlimted:{" "}
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    className="shadow-sm"
                    name="unlimited"
                    value={variation.unlimited}
                    onChange={this.handleChange}
                    single="true"
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
              <Form.Group as={Row} controlId="formGroupOption1Name">
                <Form.Label column sm={3}>
                  Opt 1 Name:
                </Form.Label>
                <Col>
                  <Form.Control
                    disabled
                    className="shadow-sm"
                    name="name"
                    arrayname="options"
                    nest="0"
                    value={variation.options[0].name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupOption1Value">
                <Form.Label column sm={3}>
                  Opt 1 Value:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
                    name="value"
                    arrayname="options"
                    nest="0"
                    value={variation.options[0].value}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupOption1Name">
                <Form.Label column sm={3}>
                  Opt 2 Name:
                </Form.Label>
                <Col>
                  <Form.Control
                    disabled
                    className="shadow-sm"
                    name="name"
                    arrayname="options"
                    nest="1"
                    value={variation.options[1].name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupOption1Value">
                <Form.Label column sm={3}>
                  Opt 2 Value:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
                    name="value"
                    arrayname="options"
                    nest="1"
                    value={variation.options[1].value}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Button
            className="shadow-sm rounded"
            variant="primary"
            type="button"
            onClick={this.handleSubmit}
          >
            <span className="pull-left">Save </span>
            <FontAwesomeIcon className="ml-2" icon={faSave} />
          </Button>
          <LinkContainer to={`/products/${this.state.response.productId}`}>
            <Button
              className="shadow-sm rounded ml-2"
              variant="success"
              type="button"
            >
              <span className="pull-left">Product </span>
              <FontAwesomeIcon className="ml-2" icon={faDirections} />
            </Button>
          </LinkContainer>
        </Form>
      </ContainerDefault>
    );
  }
}
export default withRouter(VariationsSingle);
