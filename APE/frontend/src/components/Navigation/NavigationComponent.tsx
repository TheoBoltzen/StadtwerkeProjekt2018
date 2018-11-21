import * as React from "react";
import Button from "@material-ui/core/Button";
import { PowerSettingsNew } from "@material-ui/icons";
import { Redirect } from "react-router";
import logo from "../../resources/swk.svg";
import "./NavigationComponent.css";
import { AllProps, State } from "./Navigation";
import { Link } from "react-router-dom";
import { RouterPathsConstants } from "../../constants";

export class NavigationComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  handleLogout = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    const {
      history: {
        location: { pathname }
      },
      role
    } = this.props;

    const isAdmin = role === "admin";
    const isTrainer = role === "trainer";

    if (redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className={"menu"}>
        <img className={"logo"} src={logo} />

        <div className={"navRight"}>
          {isAdmin && (
            <Link to={RouterPathsConstants.userAdministration}>
              <Button
                aria-haspopup={true}
                variant={
                  pathname === RouterPathsConstants.userAdministration ? "outlined" : "text"
                }>
                Benutzerverwaltung
              </Button>
            </Link>
          )}

          {(isAdmin || isTrainer) && (
            <Link to={RouterPathsConstants.developmentForms}>
              <Button
                aria-haspopup={true}
                variant={pathname === RouterPathsConstants.developmentForms ? "outlined" : "text"}>
                Entwicklungsbögen
              </Button>
            </Link>
          )}

          {(isAdmin || isTrainer) && (
            <Link to={RouterPathsConstants.trainees}>
              <Button
                aria-haspopup={false}
                variant={pathname === RouterPathsConstants.trainees ? "outlined" : "text"}>
                Auszubildende
              </Button>
            </Link>
          )}

          <Button className={"logout"} aria-haspopup={true} onClick={this.handleLogout}>
            <PowerSettingsNew nativeColor={"#ff0000"} />
          </Button>
        </div>
      </div>
    );
  }
}
