import * as React from "react";
import { WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import Radio from "@material-ui/core/Radio/Radio";

const styles = createStyles({
  root: {
    color: "black",
    "&$checked": {
      color: "#00beff"
    }
  },
  green: {
    color: "#43a047",
    "&$checked": {
      color: "#43a047"
    }
  },
  red: {
    color: "black",
    "&$checked": {
      color: "#d32f2e"
    }
  },
  blue: {
    color: "#00beff",
    "&$checked": {
      color: "##00beff"
    }
  },
  checked: {}
});

interface Props extends WithStyles<typeof styles> {
  checked?: string;
  onChange?: any;
  value?: string;
  name?: string;
  isGoalCross?: boolean;
  isTrainer?: boolean;
  isTrainee?: boolean;
}

export const CustomizedRadio = (props: Props) => {
  const { classes, checked, onChange, value, name, isGoalCross, isTrainer, isTrainee } = props;

  return (
    <Radio
      checked={checked}
      onChange={onChange}
      value={value}
      name={name}
      classes={
        isGoalCross
          ? { root: classes.green, checked: classes.checked }
          : isTrainee
          ? { root: classes.blue, checked: classes.checked }
          : isTrainer
          ? {
              root: classes.red,
              checked: classes.checked
            }
          : {
              root: classes.root,
              checked: classes.checked
            }
      }
    />
  );
};

export default withStyles(styles)(CustomizedRadio);
