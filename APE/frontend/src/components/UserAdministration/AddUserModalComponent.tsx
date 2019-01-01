import * as React from "react";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup
} from "@material-ui/core";
import { AllProps, State } from "./AddUserModal";
import CustomizedInput from "../General/CustomizedInput";

export class AddUserModalComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      firstname: "",
      username: "",
      password: "",
      role: "trainer",
      lastname: ""
    };
  }

  private handleSubmit = async () => {
    try {
      const { firstname, username, password, lastname, role } = this.state;
      const { createUser, closeDialog } = this.props;
      if (firstname && username && password && lastname && role) {
        await createUser(username, password, firstname, lastname, role);
        closeDialog();
      }
    } catch (e) {
      console.log(e);
    }
  };

  private handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as State);
  };

  render() {
    const { firstname, username, password, lastname, role } = this.state;
    const { loading, closeDialog } = this.props;
    return (
      <div className={"root-modal-dialog"}>
        <DialogTitle>Benutzer anlegen</DialogTitle>
        <DialogContent>
          <form onChange={this.handleInputChange}>
            <FormLabel component="legend">Art des Benutzers</FormLabel>
            <RadioGroup value={role} name={"role"}>
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="trainer" control={<Radio />} label="Ausbilder" />
              <FormControlLabel value="trainee" control={<Radio />} label="Auszubildender" />
            </RadioGroup>

            <InputLabel shrink htmlFor="bootstrap-input">
              Name
            </InputLabel>
            <CustomizedInput name={"lastname"} value={lastname} />
            <InputLabel shrink htmlFor="bootstrap-input">
              Vorname
            </InputLabel>
            <CustomizedInput name={"firstname"} value={firstname} />
            <InputLabel shrink htmlFor="bootstrap-input">
              Kennung
            </InputLabel>
            <CustomizedInput name={"username"} value={username} />
            <InputLabel shrink htmlFor="bootstrap-input">
              Passwort
            </InputLabel>
            <CustomizedInput name={"password"} value={password} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Abbrechen</Button>
          {!loading ? (
            <Button onClick={this.handleSubmit}>Bestätigen</Button>
          ) : (
            <CircularProgress />
          )}
        </DialogActions>
      </div>
    );
  }
}
