import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles({
  deleteButton: {
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
  del: {
    background: "#14AFF1 0% 0% no-repeat padding-box",
  },
  modalBackground: {
    backgroundColor: "#2A3E4C",
  },
});
function DeleteButton({onDelete}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        className={classes.deleteButton}
        //size="small"
        startIcon={<RemoveIcon />}
        onClick={handleClickOpen}
      >
        Delete
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
        <DialogTitle id="alert-dialog-title">
          <Grid container xs={12}>
            <Grid item xs={5}>
              {"Delete Record(s)? "}
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
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "#ffffff" }}
          >
            You'll lose your record(s) after this section . We can't recover
            them once you decide.<br></br>
            <br></br>
            Are you sure you want to{" "}
            <span style={{ color: "red" }}>permanently delete </span>then?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={function(event){ handleClose(); onDelete()}}
            color="primary"
            variant="contained"
            className={classes.del}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteButton;
