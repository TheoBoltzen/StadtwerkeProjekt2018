import * as React from "react";
import "../DevelopmentForms/DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "../DevelopmentForms/ListItem";
import { AllProps, State } from "./TraineeView";
import { CircularProgress } from "@material-ui/core";
import { DetailviewDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewDevelopmentSheetComponent"; //später
//import IconButton from "@material-ui/core/es/IconButton/IconButton";
//import ClearIcon from "@material-ui/icons/Clear";

export class TraineeViewComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: true,
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

    //DetailviewDevelopmentSheetComponent muss beim Klick die die id des Entwicklungsbogens mitgegeben werden!
    return this.state.visibilityIndex ? (
      <div className={"switchRoot"}>
        Hallo hier ist Content!
        <div className={"flexDiv"}>
          <div />
          <Button
            variant={"contained"}
            color={"primary"}
            className={"entwicklungsBogenButton"}
            onClick={this.changeVisibilityIndex}>
            Finde Entwicklungsbögen
          </Button>
        </div>
      </div>
    ) : (
      <div className={"switchRoot"}>
        {loading ? (
          <CircularProgress />
        ) : isHidden ? (
          <div>
            <Button
              variant={"contained"}
              color={"primary"}
              className={"entwicklungsBogenButton"}
              onClick={this.changeVisibilityIndex}>
              Zurück
            </Button>
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
                    isTrainee={true}
                  />
                );
              })}
              ;
            </div>
          </div>
        ) : (
          <div>
            <DetailviewDevelopmentSheetComponent onClick={this.handleChildClick.bind(this)} />
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
