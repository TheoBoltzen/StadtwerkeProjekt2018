import * as React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import InputBase from "@material-ui/core/es/InputBase/InputBase";
import { WithStyles, createStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    bootstrapRoot: {
      "label + &": {
        marginTop: theme.spacing.unit * 3
      }
    },
    bootstrapInput: {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: ["Roboto"].join(","),
      "&:focus": {
        borderColor: "#00beff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    },
    bootstrapFormLabel: {
      fontSize: 18
    }
  });

interface Props extends WithStyles<typeof styles> {
  name?: string;
  value?: string;
  error?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  type?: string;
}

export const CustomizedInputs = (props: Props) => {
  const { classes, name, error, type, onChange, value } = props;

  return (
    <InputBase
      type={type}
      onChange={onChange}
      name={name}
      error={error}
      value={value}
      classes={{
        root: classes.bootstrapRoot,
        input: classes.bootstrapInput
      }}
    />
  );
};

export default withStyles(styles)(CustomizedInputs);
