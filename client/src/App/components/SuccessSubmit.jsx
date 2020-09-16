import React from "react";
import { Col, Alert } from "react-bootstrap";

const SuccessSubmit = (props) => {
  return (
    <Col style={{ padding: "70px" }}>
      <div>
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>{`${props.type} with ID#: ${props.id} was ${props.operation}`}</p>
          <hr />
          <p className="mb-0">
            {`Redirecting you to the ${props.type} mainpage...`}
          </p>
        </Alert>
      </div>
    </Col>
  );
};

export default SuccessSubmit;
