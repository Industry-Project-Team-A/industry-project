import React from "react";
import axios from "axios";

import { Button, Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { LinkContainer } from "react-router-bootstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import ContainerDefault from "../../components/ContainerDefault.jsx";
import Loader from "../../components/Loader.jsx";
import linkFormatter from "../../helpers/linkFormatter.jsx";
import defaultPagination from "../../helpers/defaultPagination.jsx";

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("api/products").then((res) => {
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
        text: "Product ID",
        sort: true,
        formatter: linkFormatter,
        formatExtraData: { type: "id", section: "products" },
      },
      {
        dataField: "sku",
        text: "Base SKU",
        sort: true,
      },
      {
        dataField: "brand",
        text: "Brand",
        sort: true,
      },
      {
        dataField: "price",
        text: "Price",
        sort: true,
        formatter: (cell) => {
          return `$${cell}`;
        },
      },
      {
        dataField: "enabled",
        text: "Enabled",
        sort: true,
        style: { textTransform: "capitalize" },
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
                  <LinkContainer to={`/products/new`}>
                    <Button
                      className="btn ml-1"
                      variant="primary"
                      type="newProduct"
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
                pagination={paginationFactory(defaultPagination())}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>
      </ContainerDefault>
    );
  }
}

export default Products;
