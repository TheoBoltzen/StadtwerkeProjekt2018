import * as React from "react";
import {
  CircularProgress,
  InputLabel,
  FormControl,
  FilledInput,
  FormHelperText,
  Button
} from "@material-ui/core";
import "./LoginComponent.css";
import { AllProps, State } from "./Login";

export class LoginComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
    const { logout } = this.props;

    //Logout
    logout();

    this.state = {
      email: "",
      passwort: "",
      submitted: false
    };
  }

  render() {
    const { email, passwort, submitted } = this.state;
    const { loggingIn } = this.props;
    const noEmail = submitted && !email;
    const noPassword = submitted && !passwort;

    const handleChange = (event: any) => {
      const target = event.currentTarget;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value } as State);
    };

    const handleSubmit = () => {
      const { email, passwort } = this.state;
      const { login } = this.props;
      this.setState({ submitted: true });
      if (email && passwort) {
        login(email, passwort);
      }
    };

    return (
      <div className={"inputForm"}>
        <h1 className={"header"}>Entwicklungsbogentool</h1>
        <FormControl className={"emailForm"} variant="filled">
          <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
          <FilledInput
            name="email"
            value={email}
            onChange={handleChange}
            error={noEmail}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {noEmail && (
            <FormHelperText className={"required-error"}>
              E-Mail Adresse ist erforderlich
            </FormHelperText>
          )}
        </FormControl>

        <FormControl className={"passwordForm"} variant="filled">
          <InputLabel htmlFor="component-filled">Passwort</InputLabel>
          <FilledInput
            name="passwort"
            value={passwort}
            onChange={handleChange}
            type={"password"}
            error={noPassword}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {noPassword && (
            <FormHelperText className={"required-error"}>
              Passwort ist erforderlich
            </FormHelperText>
          )}
        </FormControl>

        {loggingIn && <CircularProgress />}

        <Button
          variant={"contained"}
          color={"primary"}
          className={"submitButton"}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    );
  }
}
