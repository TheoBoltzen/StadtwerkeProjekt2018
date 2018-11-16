import * as React from "react";
import Button from "@material-ui/core/Button";
import { PowerSettingsNew } from "@material-ui/icons";
import { Redirect } from "react-router";
import logo from "../../resources/swk.svg";
import "./NavigationComponent.css";
import { AllProps, State } from "./Navigation";
import { Link } from "react-router-dom";

export class NavigationComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  handleClick = event => {
    console.log("hallo i bims");
  };

  handleLogout = event => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;
    const {
      user: { role }
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
            <Link to={"/benutzerverwaltung"}>
              {" "}
              <Button aria-haspopup={true} onClick={this.handleClick}>
                Benutzerverwaltung
              </Button>
            </Link>
          )}

          {(isAdmin || isTrainer) && (
            <Link to={"/entwicklungsboegen"}>
              {" "}
              <Button aria-haspopup={true} onClick={this.handleClick}>
                Entwicklungsbögen
              </Button>
            </Link>
          )}

          {(isAdmin || isTrainer) && (
            <Link to={"/auszubildende"}>
              <Button aria-haspopup={true} onClick={this.handleClick}>
                Auszubildende
              </Button>
            </Link>
          )}

          <Button
            className={"logout"}
            aria-haspopup={true}
            onClick={this.handleLogout}
          >
            <PowerSettingsNew nativeColor={"#ff0000"} />
          </Button>
        </div>
      </div>
    );
  }
}
