import * as React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import LabelWithTextfield from "../DetailviewDevelopmentSheet/LabelWithTextfield";

interface Props {
  readonly closeDialog: () => void;
}

export const AddUserModalComponent = (props: Props) => {
  return (
    <div className={"root-modal-dialog"}>
      <DialogTitle>Benutzer anlegen</DialogTitle>
      <DialogContent>
        <DialogContentText>Test</DialogContentText>
        <form>
          <LabelWithTextfield name={"Name"} />
          <LabelWithTextfield name={"Vorname"} />
          <LabelWithTextfield name={"Kennung"} />
          <LabelWithTextfield name={"Tätigkeit"} />
          <LabelWithTextfield name={"Einstellungsdatum"} />
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

export { AddUserModalComponent as AddUserModal };
