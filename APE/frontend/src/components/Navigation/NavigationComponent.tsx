import * as React from "react";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import { PowerSettingsNew } from "@material-ui/icons";
import { Redirect } from "react-router";
import logo from "../../resources/swk.svg";
import "./NavigationComponent.css";

class NavigationComponent extends Component {
  state = {
    redirect: false
  };

  handleClick = event => {
    console.log("hallo i bims");
  };

  handleLogout = event => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className={"menu"}>
        <img className={"logo"} src={logo} />
        <div className={"navRight"}>
          <Button aria-haspopup={true} onClick={this.handleClick}>
            Benutzerverwaltung
          </Button>
          <Button aria-haspopup={true} onClick={this.handleClick}>
            Entwicklungsbögen
          </Button>
          <Button aria-haspopup={true} onClick={this.handleClick}>
            Auszubildende
          </Button>
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

export default NavigationComponent;
