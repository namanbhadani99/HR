import React from "react";

import "./Header.css";
import img1 from "../../assets/HrcLogo.svg";
import img2 from "../../assets/abcLogo.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <a href='/1806131'><img src={img2} className="appLogo" alt="ABC Limited" /></a>
        </Grid>
        <Grid item xs={4}>
          <img src={img1} className="alignCenter" alt="Highradius" />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};

export default Header;
