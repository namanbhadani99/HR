import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

// import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  viewCorrespondance: {
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
    modalBackground: {
      background: "#2A3E4C",
    },
    del: {
      background: "#14AFF1 0% 0% no-repeat padding-box",
    },
  },
});
function ViewCorrespondance() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.viewCorrespondance}
        onClick={handleClickOpen}
        //size="small"
      >
        View Correspondance
      </Button>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#2A3E4C",
            boxShadow: "none",
            color: "#97A1A9",
            font: "normal normal normal Ubuntu",
          },
        }}
        className={classes.box}
        open={open}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        {/* <Card className={classes.root} ref={ref}> */}

        {/* <div className={classes.heading} > */}
        <DialogTitle className={classes.modalBackground}>
          <Grid container xs={12}>
            <Grid item xs={9} style={{ paddingTop: "3px" }}>
            <span style={{ color: "#ffffff", float : "left" }}>View Correspondence</span>
            </Grid>
            <Grid item xs={3}>
            <label for="templates" style={{marginLeft:'3vw'}}>
            View :{"  "}
          </label>
            <select name="templates" id="templates"  >
            <option value="Template1">Template 1</option>
            <option value="Template2">Template 2</option>
          </select>
              <IconButton                
                style={{ color: "#97A1A9", paddingLeft: "2vw" }}
                onClick={handleClickClose}
              >
                <CloseIcon />{" "}
              </IconButton>
            </Grid>
          </Grid> 


        </DialogTitle>

        {/* </div>
                  <div id="template" class={classes.allBody}     > */}

        {/*      
                  <div className="body" > */}
        <DialogContent dividers>
          <p>
            Subject:{" "}
            <span style={{ color: "#ffffff" }}>
              Invoice Details - Account Name
            </span>
          </p>
          <br></br>
          <p>Dear Sir/Madam,</p>
          <p> Greetings!</p>
          <br></br>
          This is to remind you that there are one or more open invoices on your
          account. lease provide at your earliest convenience an update on the
          payment details or clarify the reason for the delay. If you have any
          specific issue with the invoice(s), please let us know so that we can
          address it to the correct Department.
          <br />
          <p>Please find the details of the invoices below:</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>PO Number</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Order Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>PO Number</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Order Amount</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <br></br>
          <p>
            Total Amount to be paid :{" "}
            <span style={{ color: "#ffffff" }}>$120.4K</span>
            <br />
            <br />
            In case you have already made a payment for the above items, please
            send us the details to ensure the payment is posted.
            <br />
            Let us know if we can be of any further assistance. Looking forward
            to hearing from you.
            <br />
            Kind Regards,
            <br />
            <span style={{ color: "#ffffff" }}>
              [Sender’s First Name][Sender’s Last Name]
            </span>
            <br />
            Phone :{" "}
            <span style={{ color: "#ffffff" }}>[Sender’s contact number]</span>
            <br />
            Fax : <span style={{ color: "#ffffff" }}>[If any]</span>
            <br />
            Email :{" "}
            <span style={{ color: "#ffffff" }}>[Sender’s Email Address]</span>
            <br />
            <span style={{ color: "#ffffff" }}>
              Company Name[Sender’s Company Name]
            </span>
          </p>
        </DialogContent>

        {/* </div>
          <div class="tablePart"> */}

        {/* </div>
          <div class="PostTable"> */}

        {/* </div>
          </div> */}
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClickClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClickClose}
            variant="contained"
            color="primary"
            className={classes.del}
          >
            Download
          </Button>
        </DialogActions>

        {/* </div> */}

        {/* </Card> */}
      </Dialog>
    </div>
  );
}

export default ViewCorrespondance;
