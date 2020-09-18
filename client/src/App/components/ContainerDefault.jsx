import React from "react";
import { Container } from "react-bootstrap";

const ContainerDefault = (props) => {

  return (
    <Container
      className="bg-light vh-100"
      fluid
      style={{
        paddingTop: "90px", 
      }}
    >
      <div className="shadow m-3 p-4 bg-white rounded-lg border">
        {props.children}
      </div>
    </Container>
  );
};

export default ContainerDefault;
