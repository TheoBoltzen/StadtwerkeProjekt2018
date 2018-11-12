import * as React from "react";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import "./LoginComponent.css";
import Button from "@material-ui/core/es/Button/Button";
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
    const { email, passwort } = this.state;
    const { loggingIn } = this.props;

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

    /*
    const handleKeyPress = (e) => {
        if( e.key == 'Enter') {
            handleSubmit();
            console.log("hallo i bims 1 log")
        }
    }*/

    return (
      <div className={"inputForm"}>
        <h1 className={"header"}>Entwicklungsbogentool</h1>
        <FormControl className={"emailForm"} variant="filled">
          <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
          <FilledInput
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </FormControl>

        <FormControl className={"passwordForm"} variant="filled">
          <InputLabel htmlFor="component-filled">Passwort</InputLabel>
          <FilledInput
            name="passwort"
            value={passwort}
            onChange={handleChange}
            type={"password"}
            onKeyPress={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </FormControl>

        {loggingIn && <div>Loading</div>}

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
