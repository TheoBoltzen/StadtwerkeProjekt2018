import * as React from "react";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import "./LoginComponent.css";
import Button from "@material-ui/core/es/Button/Button";

interface Props {}

interface State {
  email: "";
  passwort: "";
}

class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      passwort: ""
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
      console.log("submit funktioniert", this.state);
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

export default LoginComponent;
