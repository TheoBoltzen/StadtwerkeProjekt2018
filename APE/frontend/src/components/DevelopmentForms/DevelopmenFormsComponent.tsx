import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import DevelopmentStepper from "./DevelopmentStepper";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

export class DevelopmentFormsComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: false
    };
  }

  componentDidMount() {
    this.props.getAllDevForms();
  }

  changeVisibilityIndex = () => {
    this.setState({ visibilityIndex: !this.state.visibilityIndex });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  getContent = () => {
    const { developmentForms, loading } = this.props;

    return this.state.visibilityIndex ? (
      <div className={"switchRoot"}>
        <div className={"flexDiv"}>
          <div />
          <IconButton
            color={"primary"}
            className={"crossButton"}
            onClick={this.changeVisibilityIndex}>
            <ClearIcon />
          </IconButton>
        </div>
        <DevelopmentStepper />
      </div>
    ) : (
      <div className={"switchRoot"}>
        <div className={"flexDiv"}>
          <div />
          <Button
            variant={"contained"}
            color={"primary"}
            className={"entwicklungsBogenButton"}
            onClick={this.changeVisibilityIndex}>
            Entwicklungsbogen erstellen
          </Button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={"frame center"}>
            <ListItem
              isHeader={true}
              abteilung="Abteilung"
              job="Ausbildungsberuf"
              date="Erstellungsdatum"
              version="Version"
            />
            {developmentForms.map((devForm, index) => {
              return (
                <ListItem
                  key={index}
                  abteilung={devForm.department}
                  job={devForm.education}
                  date={this.doFormatDate(devForm.createdAt)}
                  version={devForm.version}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
