import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import LabelWithTextfield from "../DetailviewDevelopmentSheet/LabelWithTextfield";
import { AllProps } from "./AddUserModal";

export const AddUserModalComponent = (props: AllProps) => {
  return (
    <div className={"root-modal-dialog"}>
      <DialogTitle>Benutzer anlegen</DialogTitle>
      <DialogContent>
        <form>
          <FormLabel component="legend">Art des Benutzers</FormLabel>
          <RadioGroup>
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="trainer" control={<Radio />} label="Ausbilder" />
            <FormControlLabel value="trainee" control={<Radio />} label="Auszubildender" />
          </RadioGroup>

          <LabelWithTextfield name={"Name"} />
          <LabelWithTextfield name={"Vorname"} />
          <LabelWithTextfield name={"Kennung"} />
          <LabelWithTextfield name={"Passwort"} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog}>Abbrechen</Button>
        <Button>Bestätigen</Button>
      </DialogActions>
    </div>
  );
};
