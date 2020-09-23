import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faWindowClose } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";
import MultiSelectEdit from "../../components/MultiSelectEdit.jsx";

class CategoriesSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      submitted: false,
    };
  }

  handleDelete = (e) => {
    e.preventDefault();

    const data = this.state.response;
    const id = data.id;

    axios
      .delete(`/api/categories/${id}`, data)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          this.setState({ submitted: true, operation: "deleted" });
          setTimeout(() => {
            this.props.history.push("/categories");
          }, 3000);
        }
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    const id = this.state.response.id;

    axios
      .put(`/api/categories/${id}`, data)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          this.setState({ submitted: true });
          setTimeout(() => {
            this.props.history.push("/categories");
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
      .get(`/api/categories/${this.props.match.params.id}`)
      .catch((error) => {
        this.setState({ error: true });
        this.props.history.push("/404");
      })
      .then((res) => {
        if (this.state.error !== true) {
          const response = res.data;
          this.setState({ response, loading: false });
        }
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
      <ContainerDefault>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm={3}>
                  Category ID:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="id"
                    value={category.id}
                    onChange={this.handleChange}
                    disabled
                    className="shadow-sm"
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
                    value={category.name}
                    onChange={this.handleChange}
                    className="shadow-sm"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupSku">
                <Form.Label column sm={3}>
                  Parent ID: 
                </Form.Label>
                <Col>
                  <Form.Control
                    name="parentId"
                    value={category.parentId}
                    onChange={this.handleChange}
                    className="shadow-sm"
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupDescription">
                <Form.Label column sm={3}>
                  Sort Order:
                </Form.Label>
                <Col>
                  <Form.Control
                    name="orderBy"
                    value={category.orderBy}
                    onChange={this.handleChange}
                    className="shadow-sm"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupEnabled">
                <Form.Label column sm={3}>
                  Enabled:
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    name="enabled"
                    value={category.enabled}
                    onChange={this.handleChange}
                    single="true"
                    className="shadow-sm"
                  >
                    <option>yes</option>
                    <option>no</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>

            <Col md="6" sm="12">
              <MultiSelectEdit
                newDataLocation="newProdId"
                placeholder="New Product ID.."
                newDataValue={this.state.newProdId}
                listData={this.state.response.productIds}
                listDataLocation="productIds"
                label="Product IDs"
                selectedValuesLocation="selectedProdIds"
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

export default CategoriesSingle;
