import React from "react";
import { Table, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader.jsx";

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("api/categories").then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <Col style={{ padding: "70px" }}>
        <h1 className="text-center">Categories</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Parent Category</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((category) => (
              <tr>
                <td key={category.key}>
                  <LinkContainer to={`/categories/${category.id}`}>
                    <a>{category.id}</a>
                  </LinkContainer>{" "}
                </td>
                <td key={category.key}> {category.name} </td>
                <td key={category.key}> {category.parentId} </td>
                <td key={category.key}> {category.enabled} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
}

export default Categories;
