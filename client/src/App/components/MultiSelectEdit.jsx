import React from "react";
import {
  InputGroup,
  FormControl,
  Col,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class MultiSelectEdit extends React.Component {
  render() {
    return (
      <Form.Group as={Row} controlId={this.props.newDataLocation}>
        <Form.Label column sm={3}>
          {this.props.label}
        </Form.Label>
        <Col>
          <Form.Control
            as="select"
            onChange={this.props.handleListChange}
            valuename={this.props.selectedValuesLocation}
            nest={this.props.nest}
            className="shadow-sm"
            multiple
          >
            {this.props.listData.map((value) => {
              let catIndex = this.props.listData.indexOf(value);
              return (
                <option key={catIndex} val={value} id={catIndex}>
                  {value}
                </option>
              );
            })}
          </Form.Control>
          <div className="mt-1">
            <InputGroup className="rounded">
              <FormControl
                className="shadow-sm"
                name={this.props.newDataLocation}
                placeholder={this.props.placeholder}
                aria-label={this.props.placeholder}
                nest={this.props.nest}
                aria-describedby="basic-addon2"
                value={this.props.newDataValue}
                label={this.props.label}
                onChange={this.props.handleListInputChange}
                arrayname={this.props.listDataLocation}
                valuename={this.props.newDataLocation}
                onKeyDown={this.props.handleListKeyPress}
              />
              <InputGroup.Append>
                <Button
                  variant="success"
                  type="button"
                  arrayname={this.props.listDataLocation}
                  valuename={this.props.newDataLocation}
                  nest={this.props.nest}
                  label={this.props.label}
                  onClick={this.props.handleListAdd}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </InputGroup.Append>
              <Button
                variant="danger"
                arrayname={this.props.listDataLocation}
                valuename={this.props.selectedValuesLocation}
                label={this.props.label}
                onClick={this.props.handleListDelete}
                nest={this.props.nest}
                className="ml-5"
                type="button"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Form.Group>
    );
  }
}

export default MultiSelectEdit;
