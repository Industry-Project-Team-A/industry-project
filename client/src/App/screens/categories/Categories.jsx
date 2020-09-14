import React from "react";
import { Table, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader.jsx";

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: true
    };
  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response })
        this.setState({ loading: false });
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/categories");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
