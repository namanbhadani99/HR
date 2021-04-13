import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  edit: {
    fontFamily: "Ubuntu",
    font: "normal normal normal Ubuntu",
    border: "1px solid #97A1A9",
    borderRadius: "10px",
    color: "#97A1A9",
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
  saveButton: {
    background: "#14AFF1 0% 0% no-repeat padding-box",
  },
  modalBackground: {
    background: "#2A3E4C",
  },
});

function EditButton({onEdit}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [totalOpenAmount, setTotalOpeAmount] = React.useState();
  const [notes, setNotes] = React.useState();



  const Amount = (e) => {
    setTotalOpeAmount(e.target.value);
  };

  const Notes = (e) => {
    setNotes(e.target.value);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClickReset();
  };


  const handleClickReset = () => {
    setTotalOpeAmount();
    setNotes("");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  return (
    <div>
      <Button
        variant="outlined"
        className={classes.edit}
        //size="small"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        {/* {" "} */}
        Edit
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
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">
          <Grid container xs={12}>
            <Grid item xs={5} style={{ paddingTop: "3px" }}>
              {"Add Invoice"}
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={1}>
              <IconButton               
                style={{ color: "#97A1A9" }}
                onClick={handleClose}
              >
                <CloseIcon />{" "}
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              Invoice Amount
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="name"
                onChange={Amount}
                type="text"
                variant="outlined"
                //size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              Notes
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="notes"
                onChange={Notes}
                type="text"
                variant="outlined"
                multiline
                rows={5}
                //size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container xs={12}>
            <Grid item xs={2}>
              <Button onClick={handleClose} color="primary">
                CANCEL
              </Button>
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={3}>
              <Button onClick={handleClickReset} variant="outlined" color="primary">
                RESET
              </Button>
            </Grid>

            <Grid item xs={2}>
              <Button
                onClick={function(event){ handleClose(); onEdit(totalOpenAmount, notes)}}
                color="primary"
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

export default EditButton;
