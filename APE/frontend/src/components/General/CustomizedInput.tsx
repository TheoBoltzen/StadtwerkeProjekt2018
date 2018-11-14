import * as React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import TextField from "@material-ui/core/es/TextField/TextField";

const styles = {
  root: {
    background: "white"
  },
  input: {
    color: "black"
  }
};

function CustomizedInputs(props) {
  const { classes } = props;

  return (
    <TextField
      className={classes.root}
      InputProps={{
        className: classes.input
      }}
    />
  );
}

export default withStyles(styles)(CustomizedInputs);
