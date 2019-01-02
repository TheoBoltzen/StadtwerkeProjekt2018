import createStyles from "@material-ui/core/es/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/es/styles/withStyles";
import * as React from "react";
import Button from "@material-ui/core/es/Button/Button";
import classNames from "classnames";

const styles = theme =>
  createStyles({
    margin: {
      margin: theme.spacing.unit
    },
    root: {
      color: "#ffffff",
      backgroundColor: "#00beff",
      "&:hover": {
        backgroundColor: "#00a8e1"
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  onClick: any;
  text: string;
}

export const CustomizedButton = (props: Props) => {
  const { classes, onClick, text } = props;

  return (
    <Button
      variant={"contained"}
      className={classNames(classes.margin, classes.root)}
      onClick={onClick}>
      {text}
    </Button>
  );
};

export default withStyles(styles)(CustomizedButton);
