import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import Button from "@material-ui/core/Button/Button";
import classNames from "classnames";

/** MUI Style declaration **/
const styles = theme =>
  createStyles({
    margin: {
      margin: theme.spacing.unit
    },
    root: {
      color: "#ffffff",
      backgroundColor: "#d32f2e",
      "&:hover": {
        backgroundColor: "#992221"
      }
    }
  });

/** Interface declaration **/
interface Props extends WithStyles<typeof styles> {
  onClick: any;
  text: string;
  disabled?: boolean;
}

export const CustomizedButton = (props: Props) => {
  const { classes, onClick, text, disabled = false } = props;

  return (
    <Button
      disabled={disabled}
      variant={"contained"}
      className={classNames(classes.margin, classes.root)}
      onClick={onClick}>
      {text}
    </Button>
  );
};

/** Export component **/
export default withStyles(styles)(CustomizedButton);
