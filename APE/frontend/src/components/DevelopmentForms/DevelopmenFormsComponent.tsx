import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";
import { DevelopmentStepper } from "./DevelopmentStepper";

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
        <Button onClick={this.changeVisibilityIndex}>Zurück</Button>
        <DevelopmentStepper />
      </div>
    ) : (
      <div className={"switchRoot"}>
        <Button onClick={this.changeVisibilityIndex}>Entwicklungsbogen erstellen</Button>
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
        ;
      </div>
    );
  };

  render() {
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
