import React from "react";
import { Table } from "react-bootstrap";
//import{Component}
//class ...extends Component
//follow the template put super() in it
//read react component in open source

class CustomProducts extends React.Component {
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
    const response = await fetch("http://localhost:3000/customProducts");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
        <h1 className="text-center">CustomProducts</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Added By</th>
            </tr>
          </thead>
          <tbody>
            {this.state.response.map((customProduct) => (
              <tr>
                <td key={customProduct.key}> {customProduct._id} </td>
                <td key={customProduct.key}> {customProduct.title} </td>
                <td key={customProduct.key}> {customProduct.description} </td>
                <td key={customProduct.key}> {customProduct.addedBy} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CustomProducts;
