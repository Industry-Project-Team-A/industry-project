import { LinkContainer } from "react-router-bootstrap";
import React from 'react';

const linkFormatter = (cell, row, rowIndex, extraData) => {
  if (extraData.type === "id") {
    return (
      <LinkContainer to={`${extraData.section}/${row.id}`}>
        <a>{cell}</a>
      </LinkContainer>
    );
  }

  if (extraData.type === "url") {
    return (
      <a href={cell}>
        {cell}
      </a>
    )
  }
}

export default linkFormatter