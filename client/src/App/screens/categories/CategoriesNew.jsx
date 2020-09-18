import React from "react";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import SuccessSubmit from "../../components/SuccessSubmit.jsx";

class CategoriesNew extends React.Component {
  constructor() {
    super();
    this.state = {
      response: {},
      loading: true,
      submitted: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.response;
    axios.post(`/api/categories`, data).then(
      this.setState({ submitted: true }),
      setTimeout(() => {
        this.props.history.push("/categories");
      }, 3000)
    );
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
    axios.get(`/api/categories/newid`).then((res) => {
      const newId = res.data[0];
      this.setState({
        response: { id: newId, productIds: [] },
        loading: false,
      });
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
        <div className="pt-4 pl-4 pr-4 pb-4 bg-white shadow border">
          <Form onSubmit={this.handleSubmit}>
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
                      single
                    >
                      <option>yes</option>
                      <option>no</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>

              <Col md="6" sm="12">
                <Form.Group as={Row} controlId="formGroupCatIDs">
                  <Form.Label column sm={3}>
                    Product IDs:
                  </Form.Label>
                  <Col>
                    <Form.Control as="select" multiple disabled>
                      {this.state.response.productIds.map((category) => {
                        return <option>{category}</option>;
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
            <Button size="lg" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}
export default CategoriesNew;
