import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import DevelopmentStepper from "./DevelopmentStepper";

interface state {
  visibilityIndex: boolean;
}

interface Props {}

export class DevelopmentForms extends React.Component<Props, state> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibilityIndex: false
    };
  }

  changeVisibilityIndex = () => {
    this.setState({ visibilityIndex: !this.state.visibilityIndex });
  };

  getContent = () => {
    return this.state.visibilityIndex ? (
      <div className={"switchRoot"}>
        <Button onClick={this.changeVisibilityIndex}>Zurück</Button>
        <DevelopmentStepper />
      </div>
    ) : (
      <div className={"switchRoot"}>
        <div>DevelopmentForms</div>
        <Button onClick={this.changeVisibilityIndex}>Entwicklungsbogen erstellen</Button>
      </div>
    );
  };

  render() {
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
