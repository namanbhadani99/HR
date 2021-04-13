import React from "react";
import { TableCell , TableRow } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: "#97A1A9",
  },
  body: {
    color: "#ffffff",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
}))(TableRow);

const Heading = () => {
  return (
    <StyledTableRow>
      <StyledTableCell >Cust Name</StyledTableCell >
      <StyledTableCell >Cust No</StyledTableCell >
      <StyledTableCell >Inv No</StyledTableCell >
      <StyledTableCell >Amount</StyledTableCell >
      <StyledTableCell >Due Date</StyledTableCell >
      <StyledTableCell >Notes</StyledTableCell >
    </StyledTableRow >
  );
};
export default Heading;