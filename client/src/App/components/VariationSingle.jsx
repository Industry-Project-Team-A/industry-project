import React from "react";
import { LinkContainer } from "react-router-bootstrap";

class VariationSingle extends React.Component {
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

  callApi = async () => {
    const response = await fetch(
      `/api/variations/${this.props.match.params.id}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return <div>{this.state.response.sku}</div>;
  }
}

export default VariationSingle;
