import React from "react";
import axios from "axios";
import "./Row.css";
import {
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import EditButton from "../Content/EditModal";
import AddButton from "../Content/AddButton";
import DeleteButton from "../Content/DeleteButton";
import SearchComponent from "../Content/SearchContent";
import ViewCorrespondance from "../Content/View";
import PredictButton from "../Content/Predict";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paperClass: {
    borderRadius: 10,
    opacity: 1,
    padding: "2vh 1.5vw",
    background: "#273D49CC 0% 0% no-repeat padding-box",
  },
  checked: {},
  checkRoot: {
    // color:"blue",
    "&$checked": {
      color: "#14AFF1",
    },
    padding: "3px",
    borderBottom: "none",
    color: "#FFFFFF",
  },
  TableContainer: {
    height: "495px",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#273D49CC",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#61707B",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#ccc",
    },
  },
  scroll: {
    // position:"fixed",
    // width:"3000px"
  },
  tableBody: {
    position: "relative",
  },
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: "#97A1A9",
  },
  body: {
    color: "#ffffff",
    border: "0px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#283A46",
    },
  },
}))(TableRow);

const Row = () => {
  const classes = useStyles();
  const [search, setSearch] = React.useState(null);
  const [deleted, setDeleted] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);

  const onSearch = (searchId) => {
    console.log("inside search");
    console.log(searchId);
    setSearch(searchId);
    setCount(pageCount + 1);
  };

  const onDelete = () => {
    console.log("inside delete");
    console.log(selected);
    deleteData(selected.toString());
  };

  const onEdit = (totalOpenAmount, notes) => {
    console.log("inside edit");
    console.log(selected);
    if(selected && selected[0])
    {
      editData(selected[0], totalOpenAmount, notes);
    }
    else
    {
      alert("Please select a record to edit!")
    }   
  };
  
  const onAdd = () => {
    console.log("inside add after update");
    setCount(pageCount + 1); 
  };


  const editData = async (docId, totalOpenAmount, notes) => {
    console.log(docId);
    try {
      const response = await axios.post(
        "http://localhost:8080/1806131/update",
        {},
        {
          headers: { "Content-Type": "x-www-form-urlencoded" },
          params: {
            docId: docId,
            totalOpenAmount : totalOpenAmount,
            notes : notes
          },
        }
      ).then((response) => {
        console.log("Returned data:", response);
        
        if(response.data)
        {
          setUpdated(true);
          alert('Record updated successfully!');
          setCount(pageCount + 1);
        }
        else{
          alert('Record could not be updated.')
        }
          
      })
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const deleteData = async (selectedStr) => {
    console.log(selectedStr);
    try {
      const response = await axios.post(
        "http://localhost:8080/1806131/delete",
        {},
        {
          headers: { "Content-Type": "x-www-form-urlencoded" },
          params: {
            docList: selectedStr
          },
        }
      ).then((response) => {
        console.log("Returned data:", response);
        
        if(response.data)
        {
          setDeleted(true);
          alert('Records deleted successfully!');
          setCount(pageCount + 1);
        }
        else{
          alert('Records could not be deleted.')
        }
          
      })
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };



  const [responseData, setResponseData] = React.useState([
/*     {
          nameCustomer:"TIMES corp",
          custNumber:"0200458131",
          docId:"1928501762",
          totalOpenAmount:"1191.32",
          dueInDate:"2019-01-16",
          notes:""
    } */
]);
  const [isNext, setNext] = React.useState(false);
  const [pageCount, setCount] = React.useState(1);
  const [selected, setSelected] = React.useState([]);
  //const [searchString, setSearchString] = React.useState(searchId);
  const loadMoreData = () => {
    setCount(pageCount + 10);
  };

  const searchData = async (searchId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/1806131/search",
        {},
        {
          headers: { "Content-Type": "x-www-form-urlencoded" },
          params: {
            invoiceId: searchId
          },
        }
      ).then((response) => {
        console.log("Returned data:", response);
        setResponseData((prev) => [...prev, ...response.data]);
        setNext(false);
      })
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = responseData.map((n) => n.docId);
      setSelected(newSelected);
      console.log(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, docId, total_open_amount, notes) => {
    const selectedIndex = selected.indexOf(docId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, docId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    console.log(newSelected);
  };
  const isSelected = (rowId) => selected.indexOf(rowId) !== -1;
  React.useEffect(() => {

    if(!search || search === "")
    {
      axios
      .get(`http://localhost:8080/1806131/listInvoice?page=${pageCount}`)
      .then((response) => {
        //filter deleted / updated records
        if (deleted || updated)
        {
          setDeleted(false);
          setUpdated(false);
          setResponseData([]);
          setSelected([]);
        }
        //
        setResponseData((prev) => [...prev, ...response.data]);
        setNext(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else
    {
      setResponseData([]);
      searchData(search);
    }
  }, [pageCount]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paperClass}>
        <Grid container>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <PredictButton />
              <ViewCorrespondance />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <AddButton onAdd={onAdd} />
              <EditButton onEdit={onEdit}/>
              <DeleteButton onDelete={onDelete}/>
              <SearchComponent  onSearch={onSearch}/>
            </Grid>
          </Grid>
        </Grid>

    <TableContainer id="scrollable" className={classes.TableContainer}>
      <InfiniteScroll
        dataLength={responseData.length}
        next={loadMoreData}
        hasMore={isNext}
        loader={
          <div
            style={{
              height: "80%",
              paddingLeft: "35%",
              overflow: "hidden",
            }}
          >
            {/* Loading.... */}
            <CircularProgress />
          </div>
        }
        scrollableTarget="scrollable"
      >
        {
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell className={classes.root}>
                    <Checkbox
                      padding="checkbox"
                      classes={{ root: classes.checkRoot, checked: classes.checked }}
                      onChange={handleSelectAllClick}
                      checked={
                        responseData.length > 0 &&
                        selected.length === responseData.length
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>Customer Name</StyledTableCell>
                  <StyledTableCell>Customer #</StyledTableCell>
                  <StyledTableCell>Order #</StyledTableCell>
                  <StyledTableCell>Invoice Amount</StyledTableCell>
                  <StyledTableCell>Due Date</StyledTableCell>
                  <StyledTableCell>Delay</StyledTableCell>
                  <StyledTableCell>Predicted Aging Bucket</StyledTableCell>
                  <StyledTableCell>Notes</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {responseData.map((data, index) => {
                  const isItemSelected = isSelected(data.docId);
                  return (
                    <>
                      <StyledTableRow
                        onClick={(event) =>
                          handleClick(
                            event,
                            data.docId,
                            data.total_open_amount,
                            data.notes
                          )
                        }
                        // role="checkbox"
                        // aria-checked={isItemSelected}
                        key={data.docId}
                        // selected={isItemSelected}
                      >
                        <StyledTableCell className={classes.root}>
                          <Checkbox
                            padding="checkbox"
                            classes={{
                              root: classes.checkRoot,
                              checked: classes.checked,
                            }}
                            checked={isItemSelected}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>{data.nameCustomer}</StyledTableCell>
                        <StyledTableCell>{data.custNumber}</StyledTableCell>
                        <StyledTableCell>{data.docId}</StyledTableCell>
                        <StyledTableCell>
                          {data.totalOpenAmount}K
                        </StyledTableCell>
                        <StyledTableCell>{data.dueInDate}</StyledTableCell>
                        <StyledTableCell>--</StyledTableCell>
                        <StyledTableCell>--</StyledTableCell>
                        <StyledTableCell>{data.notes}</StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        }
      </InfiniteScroll>
    </TableContainer>
    </Paper>
    </div>
  );
}


export default Row;