import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles({
  add: {
    fontFamily: "Ubuntu",
    font: "normal normal normal 20px/24px Ubuntu",
    border: "1px solid #14AFF1",
    borderRadius: "10px",
    color: "#FFFFFF",
    opacity: "1",
    marginRight: "1vw",
    // fontSize: "0.95vw",
    alignSelf: "center",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#14AFF1",
      color: "white",
      textTransform: "none",
    },
  },
  /*  box: {
      background: "#2A3E4C",
      boxShadow: "0px 8px 24px #00000029",
      borderRadius: "10px 10px 0px 0px",
      opacity: "1",
    }, 
  modalBackground: {
    backgroundColor: "#2A3E4C",
  },*/
  saveButton: {
    fontFamily: "Ubuntu",
    font: "normal normal normal Ubuntu",
    border: "1px solid #14AFF1",
    borderRadius: "10px",
    color: "#FFFFFF",
    opacity: "1",
    marginLeft: "2vw",
    // fontSize: "0.95vw",
    alignSelf: "center",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#14AFF1",
      color: "white",
      textTransform: "none",
    },
  },
  txtField: {
    marginBottom: "2vh",
    border: "1px solid #356680",
    borderRadius: "10px",
    color: "#ffffff",
    width: "80%",
  },
});

function AddButton({onAdd}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
    handleClickReset();
  };

  // const addData = () => {
  //     axios({
  //       method: 'post',
  //       url: 'http://localhost:8080/1806138/add',
  //       data: formData,
  //       config: config
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  // }

  const checkData = () => {
    if (CustomerName && CustomerNo && InvNo && TotalAmount && DueInDate) {
      addData();
    } else {
      alert("All fields are madatory except Notes!");
    }
  };

  const addData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/1806131/add",
        {},
        {
          headers: { "Content-Type": "x-www-form-urlencoded" },
          params: {
            nameCustomer: CustomerName,
            custNumber: CustomerNo,
            invoiceId: InvNo,
            totalOpenAmount: TotalAmount,
            dueInDate: DueInDate,
            notes: Notes,
          },
        }
      ).then((response) => {
          console.log("Returned data:", response.data);
          alert('Record added successfully!');
          onAdd();
        })

      console.log("Returned data:", response);
      handleClickClose();
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
    }
  };

  /*   const config = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  }; */

  const [CustomerName, setCustomerName] = React.useState();
  const [CustomerNo, setCustomerNo] = React.useState();
  const [InvNo, setInvNo] = React.useState();
  const [TotalAmount, setTotalAmount] = React.useState();
  const [DueInDate, setDueInDate] = React.useState();
  const [Notes, setNotes] = React.useState();

  // const formData = {
  //     nameCustomer:CustomerName,
  //     custNumber:CustomerNo,
  //     invoiceId:InvNo,
  //     totalOpenAmount:TotalAmount,
  //     dueInDate:DueInDate,
  //     notes:Notes
  // }

  const CustName = (e) => {
    setCustomerName(e.target.value);
  };
  const CustNo = (e) => {
    setCustomerNo(e.target.value);
  };
  const InvoiceNo = (e) => {
    setInvNo(e.target.value);
  };
  const Amount = (e) => {
    setTotalAmount(e.target.value);
  };
  const DueDate = (e) => {
    setDueInDate(e.target.value);
  };
  const Anote = (e) => {
    setNotes(e.target.value);
  };

  const handleClickReset = () => {
    setCustomerName("");
    setCustomerNo("");
    setInvNo("");
    setTotalAmount("");
    setDueInDate("");
    setNotes("");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.add}
        //size="small"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add
      </Button>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#2A3E4C",
            boxShadow: "none",
            color: "#ffffff",
            font: "normal normal normal Ubuntu",
          },
        }}
        className={classes.box}
        open={open}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container xs={12}>
            <Grid item xs={11} style={{ paddingTop: "3px" }}>
              {"Add Invoice"}
            </Grid>
            <Grid item xs={1}>
              <IconButton                
                style={{ color: "#97A1A9" }}
                onClick={handleClickClose}
              >
                <CloseIcon />{" "}
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container xs={12}>
              <Grid container xs={6}>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <span htmlFor="nameCustomer">Customer name<span style={{color:"red"}}> *</span></span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.txtField}
                      id="nameCustomer"
                      required
                      type="text"
                      variant="outlined"
                      onChange={CustName}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container xs={6}>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <span htmlFor="dueInDate">Due Date<span style={{color:"red"}}> *</span></span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.txtField}
                      id="dueInDate"
                      required
                      type="date"
                      variant="outlined"
                      onChange={DueDate}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container xs={12}>
              <Grid container xs={6}>
                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <span htmlFor="custNumber">Customer No.<span style={{color:"red"}}> *</span></span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.txtField}
                      id="custNumber"
                      required
                      type="text"
                      variant="outlined"
                      onChange={CustNo}
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <span htmlFor="invoiceId">Invoice No.<span style={{color:"red"}}> *</span></span>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.txtField}
                      id=" invoiceId"
                      required
                      variant="outlined"
                      onChange={InvoiceNo}
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <span htmlFor="totalOpenAmount">Invoice Amount<span style={{color:"red"}}> *</span></span>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      className={classes.txtField}
                      id=" totalOpenAmount"
                      required
                      variant="outlined"
                      onChange={Amount}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={6}>
                <Grid item xs={6}>
                  <span htmlFor="notes">Notes</span>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    className={classes.txtField}
                    id="notes"
                    multiline
                    rows={5}
                    type="text"
                    variant="outlined"
                    onChange={Anote}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Grid container xs={12} justify="space-between">
            <Grid item xs={2}>
              <Button onClick={handleClickClose} color="primary">
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleClickReset}
                variant="outlined"
                className={classes.saveButton}
              >
                RESET
              </Button>
              <Button
                onClick={() => {
                  checkData();
                }}
                className={classes.saveButton}
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddButton;
