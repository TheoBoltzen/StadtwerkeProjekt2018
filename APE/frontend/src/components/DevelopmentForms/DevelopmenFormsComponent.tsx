import * as React from "react";
import "./DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import DevelopmentStepper from "./DevelopmentStepper";
import { ListItem } from "./ListItem";
import { AllProps, State } from "./DevelopmentForms";
import { CircularProgress } from "@material-ui/core";
import { DetailviewDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewDevelopmentSheetComponent";

export class DevelopmentFormsComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: false,
      isHidden: true
    };
  }

  handleChildClick() {
    this.setState({
      isHidden: !this.state.isHidden
    });
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
    const { isHidden } = this.state;

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
        ) : isHidden ? ( //--------
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
                  onClick={this.handleChildClick.bind(this)}
                />
              );
            })}
            ;
          </div>
        ) : (
          <div>
            <DetailviewDevelopmentSheetComponent onClick={this.handleChildClick.bind(this)} />
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
