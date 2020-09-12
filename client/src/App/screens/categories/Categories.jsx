import React from "react";
import { Table, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
//import{Component}
//class ...extends Component
//follow the template put super() in it
//read react component in open source

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    this.callApi()
      .then((response) => {
        this.setState({ response });
      })
      .catch((err) => console.log(err));
  }
  //async we are waiting
  //wait for the fetch to run
  //when result comes back , going into response
  callApi = async () => {
    const response = await fetch("/api/categories");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}

export default Categories;
