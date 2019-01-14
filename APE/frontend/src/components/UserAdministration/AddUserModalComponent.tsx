import * as React from "react";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  InputLabel,
  RadioGroup,
  TextField
} from "@material-ui/core";
import { AllProps, State } from "./AddUserModal";
import CustomizedInput from "../General/CustomizedInput";
import CustomizedRadio from "../General/CustomizedRadio";
import "./AddUserModalComponent.css";
import CustomizedButton from "../General/CustomizedButton";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import createStyles from "@material-ui/core/styles/createStyles";

export const styles = theme =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    actions: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2
    }
  });

export class AddUserModalComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      firstname: "",
      username: "",
      password: "",
      role: "trainer",
      lastname: "",
      hiredOn: "",
      profession: ""
    };
  }

  private handleSubmit = async () => {
    try {
      const { firstname, username, password, lastname, role, hiredOn, profession } = this.state;
      const { createUser, closeDialog } = this.props;
      if (firstname && username && password && lastname && role && hiredOn && profession) {
        await createUser(username, password, firstname, lastname, role, hiredOn, profession);
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
    const { firstname, username, password, lastname, role, hiredOn, profession } = this.state;
    const { loading, closeDialog, classes } = this.props;
    return (
      <Dialog fullWidth={true} maxWidth={"sm"} open={true} onClose={closeDialog}>
        <DialogTitle className={classes.root}>
          <Typography variant={"h6"}>Benutzer anlegen</Typography>
          <IconButton aria-label="Close" className={classes.closeButton} onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onChange={this.handleInputChange} className={"formDivModal"}>
            <div className={"flexDivForm2"}>
              <FormControl>
                <FormLabel component="legend">
                  <Typography variant={"subtitle1"}>Art des Benutzers</Typography>
                </FormLabel>
                <RadioGroup value={role} name={"role"} row>
                  <FormControlLabel value="admin" control={<CustomizedRadio />} label="Admin" />
                  <FormControlLabel
                    value="trainer"
                    control={<CustomizedRadio />}
                    label="Ausbilder"
                  />
                  <FormControlLabel
                    value="trainee"
                    control={<CustomizedRadio />}
                    label="Auszubildender"
                  />
                </RadioGroup>
              </FormControl>
              <div />
            </div>

            <div className={"flexDivForm"}>
              <div>
                <FormControl className={"leftDiv"}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Typography variant={"subtitle1"}>Name</Typography>
                  </InputLabel>
                  <CustomizedInput name={"lastname"} value={lastname} />
                </FormControl>
              </div>
              <div>
                <FormControl className={"rightDiv"}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Typography variant={"subtitle1"}>Vorname</Typography>
                  </InputLabel>
                  <CustomizedInput name={"firstname"} value={firstname} />
                </FormControl>
              </div>
            </div>

            <div className={"flexDivForm"}>
              <div>
                <FormControl className={"leftDiv"}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Typography variant={"subtitle1"}>Kennung</Typography>
                  </InputLabel>
                  <CustomizedInput name={"username"} value={username} />
                </FormControl>
              </div>
              <div>
                <FormControl className={"rightDiv"}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Typography variant={"subtitle1"}>Passwort</Typography>
                  </InputLabel>
                  <CustomizedInput name={"password"} value={password} type={"password"} />
                </FormControl>
              </div>
            </div>

            <div className={"flexDivForm"}>
              <div>
                <FormControl className={"leftDiv"}>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    <Typography variant={"subtitle1"}>Tätigkeit</Typography>
                  </InputLabel>
                  <CustomizedInput name={"profession"} value={profession} />
                </FormControl>
              </div>
              <div>
                <FormControl className={"rightDiv"}>
                  <TextField
                    name={"hiredOn"}
                    value={hiredOn}
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    label={"Einstellungsdatum"}
                    fullWidth={true}
                  />
                </FormControl>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          {!loading ? (
            <CustomizedButton onClick={this.handleSubmit} text={"Erstellen"} />
          ) : (
            <CircularProgress />
          )}
        </DialogActions>
      </Dialog>
    );
  }
}
