import * as React from "react";
import "./LabelWithTextfield.css";
import { TextField } from "@material-ui/core";

/*const styles = theme =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        dense: {
            marginTop: 16,
        },
        menu: {
            width: 200,
        },
    });

interface Props extends WithStyles<typeof styles>{
  name?: string;
  content?: string;
}*/

interface Props {
  name?: string;
  content?: string;
}

export const LabelWithTextfield = (props: Props) => {
  const { name, content } = props;

  return (
    <div>
      <TextField margin="normal" label={name} variant={"outlined"} value={content} />
    </div>
  );
};
