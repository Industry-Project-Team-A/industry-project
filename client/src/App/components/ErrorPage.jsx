import React from "react";
import { Col, Alert } from "react-bootstrap";

class ErrorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
  setTimeout(() => {
    this.props.history.push("/");
  }, 3000);
}

render () {
  return (
    <Col style={{ padding: "95px" }}>
      <div className="shadow-lg rounded-lg">
        <Alert variant="danger">
          <Alert.Heading>Error!</Alert.Heading>
          <p>
            There was an error loading the page, or the database server is
            having issues.
          </p>
          <hr />
          <p className="mb-0">{`Redirecting you to the mainpage...`}</p>
        </Alert>
      </div>
    </Col>
  );
}

};

export default ErrorPage;
