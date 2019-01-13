import * as React from "react";
import Button from "@material-ui/core/Button";
import { PowerSettingsNew } from "@material-ui/icons";
import { Redirect } from "react-router";
import logo from "../../resources/swk_full.png";
import "./NavigationComponent.css";
import { AllProps, State } from "./Navigation";
import { Link } from "react-router-dom";
import { RoleConstants, RouterPathsConstants } from "../../constants";
import { Tooltip } from "@material-ui/core";

export class NavigationComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };

    this.props.getRole(this.props.user.token);
  }

  handleLogout = () => {
    this.props.successAlert("Erfolgreich abgemeldet");
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    const logoutToolTip = "Logout";
    const {
      history: {
        location: { pathname }
      },
      role
    } = this.props;

    const isAdmin = role === RoleConstants.admin;
    const isTrainer = role === RoleConstants.trainer;

    if (redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className={"menu"}>
        <img className={"navLogo"} src={logo} width={"238.2"} height={"60"} />

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
                Zuweisungen
              </Button>
            </Link>
          )}

          <Tooltip title={logoutToolTip}>
            <Button className={"logout"} aria-haspopup={true} onClick={this.handleLogout}>
              <PowerSettingsNew nativeColor={"#d32f2e"} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}
