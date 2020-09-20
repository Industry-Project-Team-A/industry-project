import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import ContainerDefault from "../../components/ContainerDefault.jsx";
import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";
import MultiSelectEdit from "../../components/MultiSelectEdit.jsx";

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

    //special situation for nested arrays
    if (e.currentTarget.getAttribute("nest")) {
      let nest = e.currentTarget.getAttribute("nest");
      let formValues = this.state.response;
      let array = formValues["options"][nest][arrayname];

      for (let i = 0; i < array.length; i++) {
        if (value === array[i]) {
          alert(`No duplicate ${label} can be accepted.`);
          this.setState({ [valuename]: "" });
          return;
        }
      }
      formValues["options"][nest][arrayname].push(value);

      this.setState({ formValues, [valuename]: "" });
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

      //special situation for nested arrays
      if (e.currentTarget.getAttribute("nest")) {
        let nest = e.currentTarget.getAttribute("nest");
        let formValues = this.state.response;
        let array = formValues["options"][nest][arrayname];

        for (let i = 0; i < array.length; i++) {
          if (value === array[i]) {
            alert(`No duplicate ${label} can be accepted.`);
            this.setState({ [valuename]: "" });
            return;
          }
        }
        formValues["options"][nest][arrayname].push(value);

        this.setState({ formValues, [valuename]: "" });
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

    //special situation for nested arrays
    if (e.currentTarget.getAttribute("nest")) {
      let nest = e.currentTarget.getAttribute("nest");
      let currentItems = this.state.response;

      for (let i = 0; i < selectedItems.length; i++) {
        let index = parseInt(selectedItems[i], 10);
        currentItems["options"][nest][arrayname].splice(index - i, 1);
      }

      this.setState({ currentItems });
      return;
    }

    for (let i = 0; i < selectedItems.length; i++) {
      let index = parseInt(selectedItems[i], 10);
      currentItems.splice(index - i, 1);
    }

    this.setState({ currentItems });
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
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupId">
                <Form.Label column sm={3}>
                  Product ID:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    name="id"
                    disabled
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
                    className="shadow-sm"
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
                    className="shadow-sm"
                    name="sku"
                    value={product.sku}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupPrice">
                <Form.Label column sm={3}>
                  Price:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    name="price"
                    value={product.price}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="6" sm="12">
              <Form.Group as={Row} controlId="formGroupShippingOnly">
                <Form.Label column sm={3}>
                  Fixed Ship Only:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    as="select"
                    name="fixedShippingRateOnly"
                    value={product.fixedShippingRateOnly}
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
              <Form.Group as={Row} controlId="formGroupEnabled">
                <Form.Label column sm={3}>
                  Enabled:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    as="select"
                    name="enabled"
                    value={product.enabled}
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
              <Form.Group as={Row} controlId="formGroupBrand">
                <Form.Label column sm={3}>
                  Brand:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    name="brand"
                    value={product.brand}
                    onChange={this.handleChange}
                  />
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
                    className="shadow-sm"
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
              <Form.Group as={Row} controlId="formGroupDescription">
                <Form.Label column sm={3}>
                  Description:
                </Form.Label>
                <Col>
                  <Form.Control
                    className="shadow-sm"
                    as="textarea"
                    rows="4"
                    name="description"
                    value={product.description}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col md="6" sm="12">
              <MultiSelectEdit
                newDataLocation="newCatId"
                placeholder="New Category ID.."
                newDataValue={this.state.newCatId}
                listData={this.state.response.categoryIds}
                listDataLocation="categoryIds"
                label="Category IDs:"
                selectedValuesLocation="selectedCatIds"
                handleListChange={this.handleListChange}
                handleListAdd={this.handleListAdd}
                handleListDelete={this.handleListDelete}
                handleListInputChange={this.handleListInputChange}
                handleListKeyPress={this.handleListKeyPress}
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6" lg="12">
              <MultiSelectEdit
                newDataLocation="newImages"
                placeholder="New Image URL.."
                newDataValue={this.state.newImages}
                listData={this.state.response.images}
                listDataLocation="images"
                label="Images:"
                selectedValuesLocation="selectedImages"
                handleListChange={this.handleListChange}
                handleListAdd={this.handleListAdd}
                handleListDelete={this.handleListDelete}
                handleListInputChange={this.handleListInputChange}
                handleListKeyPress={this.handleListKeyPress}
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6" lg="12">
              <Card className="rounded shadow bg-white mt-4">
                <Card.Header className="font-weight-bold">Option 1</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xl="4" lg="12">
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Name:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            name="name"
                            arrayname="options"
                            nest="0"
                            value={product.options[0].name}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Type:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            as="select"
                            name="type"
                            arrayname="options"
                            nest="0"
                            value={product.options[0].type}
                            onChange={this.handleChange}
                            single="true"
                          >
                            <option></option>
                            <option>SELECT</option>
                            <option>CHECKBOX</option>
                            <option>RADIO</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col xl="8" lg="12">
                      <Col>
                        <MultiSelectEdit
                          newDataLocation="newOption1"
                          placeholder="New Option..."
                          newDataValue={this.state.newOption1}
                          listData={
                            this.state.response["options"][0]["choices"]
                          }
                          listDataLocation="choices"
                          nest="0"
                          label="Options:"
                          selectedValuesLocation="selectedOption1"
                          handleListChange={this.handleListChange}
                          handleListAdd={this.handleListAdd}
                          handleListDelete={this.handleListDelete}
                          handleListInputChange={this.handleListInputChange}
                          handleListKeyPress={this.handleListKeyPress}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xl="6" lg="12">
              <Card className="rounded shadow bg-white mt-4">
                <Card.Header className="font-weight-bold">Option 2</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xl="4" lg="12">
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Name:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            name="name"
                            arrayname="options"
                            nest="1"
                            value={product.options[1].name}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Type:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            as="select"
                            name="type"
                            arrayname="options"
                            nest="1"
                            value={product.options[1].type}
                            onChange={this.handleChange}
                            single="true"
                          >
                            <option></option>
                            <option>SELECT</option>
                            <option>CHECKBOX</option>
                            <option>RADIO</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col xl="8" lg="12">
                      <Col>
                        <MultiSelectEdit
                          newDataLocation="newOption2"
                          placeholder="New Option..."
                          newDataValue={this.state.newOption2}
                          listData={
                            this.state.response["options"][1]["choices"]
                          }
                          listDataLocation="choices"
                          nest="1"
                          label="Options:"
                          selectedValuesLocation="selectedOption2"
                          handleListChange={this.handleListChange}
                          handleListAdd={this.handleListAdd}
                          handleListDelete={this.handleListDelete}
                          handleListInputChange={this.handleListInputChange}
                          handleListKeyPress={this.handleListKeyPress}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl="6" lg="12">
              <Card className="rounded shadow bg-white mt-4">
                <Card.Header className="font-weight-bold">Option 3</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xl="4" lg="12">
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Name:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            name="name"
                            arrayname="options"
                            nest="2"
                            value={product.options[2].name}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Type:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            as="select"
                            name="type"
                            arrayname="options"
                            nest="2"
                            value={product.options[2].type}
                            onChange={this.handleChange}
                            single="true"
                          >
                            <option></option>
                            <option>SELECT</option>
                            <option>CHECKBOX</option>
                            <option>RADIO</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col xl="8" lg="12">
                      <Col>
                        <MultiSelectEdit
                          newDataLocation="newOption3"
                          placeholder="New Option..."
                          newDataValue={this.state.newOption3}
                          listData={
                            this.state.response["options"][2]["choices"]
                          }
                          listDataLocation="choices"
                          nest="2"
                          label="Options:"
                          selectedValuesLocation="selectedOption3"
                          handleListChange={this.handleListChange}
                          handleListAdd={this.handleListAdd}
                          handleListDelete={this.handleListDelete}
                          handleListInputChange={this.handleListInputChange}
                          handleListKeyPress={this.handleListKeyPress}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xl="6" lg="12">
              <Card className="rounded shadow bg-white mt-4">
                <Card.Header className="font-weight-bold">Option 4</Card.Header>
                <Card.Body>
                  <Row>
                    <Col xl="4" lg="12">
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Name:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            name="name"
                            arrayname="options"
                            nest="3"
                            value={product.options[3].name}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formGroupId">
                        <Form.Label column xl={3} lg={12}>
                          Type:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            className="shadow-sm"
                            as="select"
                            name="type"
                            arrayname="options"
                            nest="3"
                            value={product.options[3].type}
                            onChange={this.handleChange}
                            single="true"
                          >
                            <option></option>
                            <option>SELECT</option>
                            <option>CHECKBOX</option>
                            <option>RADIO</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col xl="8" lg="12">
                      <Col>
                        <MultiSelectEdit
                          newDataLocation="newOption4"
                          placeholder="New Option..."
                          newDataValue={this.state.newOption4}
                          listData={
                            this.state.response["options"][3]["choices"]
                          }
                          listDataLocation="choices"
                          nest="3"
                          label="Options:"
                          selectedValuesLocation="selectedOption1"
                          handleListChange={this.handleListChange}
                          handleListAdd={this.handleListAdd}
                          handleListDelete={this.handleListDelete}
                          handleListInputChange={this.handleListInputChange}
                          handleListKeyPress={this.handleListKeyPress}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
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

export default ProductsNew;
