import * as React from "react";
import "./LabelWithTextfield.css";
import { TextField } from "@material-ui/core";
//import {Label} from '@material-ui/icons';

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
