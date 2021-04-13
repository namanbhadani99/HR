import React from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
import SearchIcon from "@material-ui/icons/Search";
import Row from "../Row/Row";
import Button from "@material-ui/core/Button";
import EditButton from "./EditModal";
import AddButton from "./AddButton";
import DeleteButton from "./DeleteButton";
import SearchComponent from "./SearchContent";
import ViewCorrespondance from "./View";
import PredictButton from "./Predict";
import "./Content.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperClass: {
    borderRadius: 10,
    opacity: 1,
    padding: "2vh 1.5vw",
    background: "#273D49CC 0% 0% no-repeat padding-box",
  },
}));

const Content = () => {
  const classes = useStyles();

  const [search, setSearch] = React.useState(null);

  const onSearch = (searchId) => {
    console.log(searchId);
    setSearch();
  };

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
              <AddButton />
              <EditButton />
              <DeleteButton />
              <SearchComponent  onSearch={onSearch}/>
            </Grid>
          </Grid>
        </Grid>

        <Row
          searchId={search}
        />
      </Paper>
    </div>
  );
};

export default Content;
