import * as React from "react";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import "./LoginComponent.css";
import Button from "@material-ui/core/es/Button/Button";
import { connect } from "react-redux";
import { login, logout } from "./redux/actions";

interface Props {}

interface ReduxProps {
  loggingIn: boolean;
  dispatch: any;
}

export type AllProps = Props & ReduxProps;

interface State {
  email: string;
  passwort: string;
  submitted: boolean;
}

class LoginComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    //Logout
    this.props.dispatch(logout());

    this.state = {
      email: "",
      passwort: "",
      submitted: false
    };
  }
  render() {
    const { email, passwort } = this.state;

    const handleChange = (event: any) => {
      const target = event.currentTarget;
      const value = target.value;
      const name = target.name;
      this.setState({ [name]: value } as State);
    };

    const handleSubmit = () => {
      const { email, passwort } = this.state;
      this.setState({ submitted: true });
      if (email && passwort) {
        console.log("submit", this.state);
        this.props.dispatch(login(email, passwort));
      }
    };

    return (
      <div className={"inputForm"}>
        <h1 className={"header"}>Entwicklungsbogentool</h1>
        <FormControl className={"emailForm"} variant="filled">
          <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
          <FilledInput name="email" value={email} onChange={handleChange} />
        </FormControl>

        <FormControl className={"passwordForm"} variant="filled">
          <InputLabel htmlFor="component-filled">Passwort</InputLabel>
          <FilledInput
            name="passwort"
            value={passwort}
            onChange={handleChange}
            type={"password"}
          />
        </FormControl>

        {this.props.loggingIn && <div>Loading</div>}

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

const mapStateToProps = (state: any) => {
  console.log("state", state);

  const { loggingIn } = state.authenticationReducer;
  return {
    loggingIn
  };
};

const connectedLogin = connect(mapStateToProps)(LoginComponent);
export { connectedLogin as Login };
