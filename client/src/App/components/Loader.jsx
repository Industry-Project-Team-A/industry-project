import React from "react";
import { Col, Spinner } from "react-bootstrap";

const Loader = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Col className="vh-100 vw-100" style={{ backgroundColor: "#303030" }}>
      <div style={style}>
        <Spinner animation="border" variant="info">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </Col>
  );
};

export default Loader;
