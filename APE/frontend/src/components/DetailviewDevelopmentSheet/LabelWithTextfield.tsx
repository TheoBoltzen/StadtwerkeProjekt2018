import * as React from "react";
import "./LabelWithTextfield.css";
import { TextField } from "@material-ui/core";
import { createStyles, WithStyles } from "@material-ui/core/es";
import withStyles from "@material-ui/core/es/styles/withStyles";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";

const styles = theme =>
  createStyles({
    margin: {
      margin: theme.spacing.unit,
      backgroundColor: "white"
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
}

export const LabelWithTextfield = (props: Props) => {
  const { name, content, classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <TextField className={classes.margin} label={name} variant={"outlined"} value={content} />
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(LabelWithTextfield);
