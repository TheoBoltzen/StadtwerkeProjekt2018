import * as React from "react";
import "./LabelWithTextfield.css";
import { TextField } from "@material-ui/core";
import { createStyles } from "@material-ui/core/es";
import withStyles from "@material-ui/core/es/styles/withStyles";
import createMuiTheme from "@material-ui/core/es/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";

const styles = theme =>
  createStyles({
    margin: {
      margin: theme.spacing.unit,
      backgroundColor: "white"
    },
    cssLabel: {
      "&$cssFocused": {
        color: "#00a8e1"
      }
    },
    cssFocused: {},
    cssUnderline: {
      "&:after": {
        borderBottomColor: "#00a8e1"
      }
    },
    cssOutlinedInput: {
      "&$cssFocused $notchedOutline": {
        borderColor: "#00a8e1"
      }
    },
    notchedOutline: {}
  });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00a8e1"
    }
  },
  typography: { useNextVariants: true }
});

interface Props {
  name?: string;
  content?: string;
}

export const LabelWithTextfield = (props: Props) => {
  const { name, content } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <TextField
        /*InputLabelProps={{
              classes: {
                  root: classes.cssLabel

              },
          }}
          InputProps={{
              classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
              },
          }}*/
        color="white"
        margin="normal"
        label={name}
        variant={"outlined"}
        value={content}
      />
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(LabelWithTextfield);
