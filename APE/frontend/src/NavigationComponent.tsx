import * as React from "react";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import { PowerSettingsNew } from "@material-ui/icons";
import { Redirect } from "react-router";

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
          {" "}
          <PowerSettingsNew nativeColor={"#ff0000"} />
        </Button>
      </div>
    );
  }
}

export default NavigationComponent;
