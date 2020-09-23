import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";
import MultiSelectEdit from "../../components/MultiSelectEdit.jsx";

class StoresNew extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      submitted: false,
      newLogo: "",
      selectedLogos: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    axios
      .post(`/api/stores`, data)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          this.setState({ submitted: true });
          setTimeout(() => {
            this.props.history.push("/stores");
          }, 3000);
        }
      });
  };

  handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let formValues = this.state.response;
    //special situation for nested arrays
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

  handleListInputChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  handleListChange = (e) => {
    let allValues = e.currentTarget.options;
    let valuesLocation = e.currentTarget.getAttribute("valuename");
    let newValues = [];

    for (let i = 0; i < allValues.length; i++) {
      if (allValues[i].selected) {
        newValues.push(allValues[i].id);
      }
    }

    this.setState({ [valuesLocation]: newValues });
  };

  handleListAdd = (e) => {
    let formValues = this.state.response;
    let arrayname = e.currentTarget.getAttribute("arrayname");
    let valuename = e.currentTarget.getAttribute("valuename");

    let value = this.state[valuename];
    let array = formValues[arrayname];
    let label = e.currentTarget.getAttribute("label");

    if (value === "") {
      return;
    }

    for (let i = 0; i < array.length; i++) {
      if (value === array[i]) {
        alert(`No duplicate ${label} can be accepted.`);
        this.setState({ [valuename]: "" });
        return;
      }
    }

    formValues[arrayname].push(value);

    this.setState({ formValues, [valuename]: "" });
  };

  handleListKeyPress = (e) => {
    let key = e.key;
    if (key === "Enter") {
      let formValues = this.state.response;
      let arrayname = e.target.getAttribute("arrayname");
      let valuename = e.target.getAttribute("valuename");

      let value = this.state[valuename];
      let array = formValues[arrayname];
      let label = e.target.getAttribute("label");

      if (value === "") {
        return;
      }

      for (let i = 0; i < array.length; i++) {
        if (value === array[i]) {
          alert(`No duplicate ${label} can be accepted.`);
          this.setState({ [valuename]: "" });
          return;
        }
      }

      formValues[arrayname].push(value);

      this.setState({ formValues, [valuename]: "" });
    }
  };

  handleListDelete = (e) => {
    let selectedLocation = e.currentTarget.getAttribute("valuename");
    let arrayname = e.currentTarget.getAttribute("arrayname");

    let selectedItems = this.state[selectedLocation];
    let currentItems = this.state.response[arrayname];

    for (let i = 0; i < selectedItems.length; i++) {
      let index = parseInt(selectedItems[i], 10);
      currentItems.splice(index - i, 1);
    }

    this.setState({ currentItems });
  };

  componentDidMount() {
    axios
      .get("/api/stores/newid")
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          const newId = res.data[0];
          this.setState({
            response: { id: newId, logos: [] },
            loading: false,
          });
        }
      });
  }
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.submitted)
      return (
        <SuccessSubmit
          type="Store"
          id={this.state.response.id}
          operation="created"
        />
      );
    const store = this.state.response;
    return (
      <ContainerDefault>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm={3}>
                  Store ID:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    disabled
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
                    className="shadow-sm"
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
                    className="shadow-sm"
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
                    className="shadow-sm"
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
                    className="shadow-sm"
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
                  Base URL:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
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
                    className="shadow-sm"
                    as="select"
                    name="shippingIncluded"
                    value={store.shippingIncluded}
                    onChange={this.handleChange}
                    single="true"
                  >
                    <option>yes</option>
                    <option>no</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <MultiSelectEdit
                newDataLocation="newLogo"
                placeholder="New Logo ID.."
                newDataValue={this.state.newLogo}
                listData={this.state.response.logos}
                listDataLocation="logos"
                label="Logo IDs:"
                selectedValuesLocation="selectedLogos"
                handleListChange={this.handleListChange}
                handleListAdd={this.handleListAdd}
                handleListDelete={this.handleListDelete}
                handleListInputChange={this.handleListInputChange}
                handleListKeyPress={this.handleListKeyPress}
              />
            </Col>
          </Row>
          <Row>
            <Button
              className="shadow-sm rounded ml-2"
              variant="primary"
              type="button"
              onClick={this.handleSubmit}
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
