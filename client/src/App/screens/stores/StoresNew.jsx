import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";

class StoresNew extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, submitted: false };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    axios.post(`/api/stores`, data).then(
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
    axios.get("/api/stores/newid").then((res) => {
      const newId = res.data[0];
      this.setState({
        response: { id: newId, logos: [] },
        loading: false,
      });
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
      <ContainerDefault>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm={3}>
                  Store Id:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="id"
                    value={store.id}
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
                    value={store.name}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupTag">
                <Form.Label column sm={3}>
                  Tag:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="tag"
                    value={store.tag}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupApiId">
                <Form.Label column sm={3}>
                  API Username:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="apiId"
                    value={store.apiId}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupToken">
                <Form.Label column sm={3}>
                  API Token:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="token"
                    value={store.token}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupBaseUrl">
                <Form.Label column sm={3}>
                  Base Url:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="baseUrl"
                    value={store.baseUrl}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="ShippingIncluded">
                <Form.Label column sm={3}>
                  Free Shipping:
                </Form.Label>
                <Col>
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
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupLogos">
                <Form.Label column sm={3}>
                  Logos:
                </Form.Label>
                <Col>
                  <Form.Control as="select" multiple disabled>
                    {this.state.response.logos.map((logo) => {
                      return <option>{logo}</option>;
                    })}
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
export default StoresNew;
