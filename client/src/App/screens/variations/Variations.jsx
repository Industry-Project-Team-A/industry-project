import React from "react";
import axios from "axios";

import { Button, Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { LinkContainer } from "react-router-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader.jsx";
import linkFormatter from "../../helpers/linkFormatter.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";

class Variations extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("api/variations").then((res) => {
      const response = res.data;
      this.setState({ response, loading: false });
    });
  }

  render() {
    if (this.state.loading) return <Loader />;

    const { SearchBar } = Search;

    const columns = [
      {
        dataField: "id",
        text: "Variation ID",
        sort: true,
        formatter: linkFormatter,
        formatExtraData: { type: "id", section: "variations" },
      },
      {
        dataField: "sku",
        text: "Full SKU",
        sort: true,
      },
      {
        dataField: "productId",
        text: "Product ID",
        sort: true,
      },
    ];

    return (
      <ContainerDefault>
        <ToolkitProvider
          keyField="id"
          data={this.state.response}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <SearchBar {...props.searchProps} />
                </Col>

                <Col className="text-right">
                  <LinkContainer to={`/variations/new`}>
                    <Button
                      className="btn ml-1"
                      variant="primary"
                      type="newVariation"
                    >
                      <span className="pull-left">New </span>
                      <FontAwesomeIcon className="ml-2" icon={faPlusCircle} />
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>

              <BootstrapTable
                striped
                hover
                bootstrap4
                keyField="id"
                data={this.state.response}
                columns={columns}
                pagination={paginationFactory()}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>
      </ContainerDefault>
    );
  }
}

export default Variations;
