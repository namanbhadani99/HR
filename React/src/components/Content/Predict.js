import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  predict: {
    fontFamily: "Ubuntu",
    font: "normal normal normal 20px/24px Ubuntu",
    background: "#97a1a9 0% 0% noRepeat paddingBox",
    borderRadius: "10px",
    opacity: "1",
    marginRight: "1vw",
    // fontSize: "0.95vw",
    alignSelf: "center",
    color: "#ffffff",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#14AFF1",
      color: "white",
      textTransform: "none",
    },
  },
});
function PredictButton() {
  const classes = useStyles();
  return (
    <div>
      <Button 
        variant="contained" 
        className={classes.predict} 
        //size="small"
      >
        Predict
      </Button>
    </div>
  );
}

export default PredictButton;
