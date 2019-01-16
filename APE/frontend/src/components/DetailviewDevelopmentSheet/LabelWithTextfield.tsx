import * as React from "react";
import "./LabelWithTextfield.css";
import { TextField } from "@material-ui/core";
import { createStyles, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const styles = createStyles({
  margin: {
    margin: "16px",
    backgroundColor: "white",
    width: "370px"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00a8e1"
    }
  },
  typography: { useNextVariants: true }
});

interface Props extends WithStyles<typeof styles> {
  name?: string;
  content?: string;
  disabled?: boolean;
}

export const LabelWithTextfield = (props: Props) => {
  const { name, content, classes, disabled = false } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        className={classes.margin}
        label={name}
        variant={"outlined"}
        value={content}
        disabled={disabled}
      />
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(LabelWithTextfield);
