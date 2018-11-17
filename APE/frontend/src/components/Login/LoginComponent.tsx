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
import logo from "../../resources/swk.svg";
import CustomizedInput from "../General/CustomizedInput";

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
      console.log(this.state);
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
      <div className={"all"}>
        <header>
          <img className={"logo"} src={logo} />
        </header>

        <h1 className={"header"}>Entwicklungsbogentool</h1>

        <div className={"loginContainer"}>
          <div className={"textBox"}>
            Am Ende deiner Ausbildung weißt du, was du willst, wer du bist und
            was du kannst
          </div>

          <div
            className={"inputForm"}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          >
            <FormControl className={"emailForm"}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Kennung
              </InputLabel>
              <CustomizedInput name="email" value={email} error={noEmail} />

              {noEmail && (
                <FormHelperText className={"required-error"}>
                  Kennung ist erforderlich
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

            {!loggingIn && (
              <Button
                variant={"contained"}
                color={"primary"}
                className={"submitButton"}
                onClick={handleSubmit}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
