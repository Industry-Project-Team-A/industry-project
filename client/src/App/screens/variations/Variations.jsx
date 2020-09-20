import React from "react";
import axios from "axios";

import { Row, Col } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import Loader from "../../components/Loader.jsx";
import linkFormatter from "../../helpers/linkFormatter.jsx";
import ContainerDefault from "../../components/ContainerDefault.jsx";
import defaultPagination from "../../helpers/defaultPagination.jsx";

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

export default Variations;
