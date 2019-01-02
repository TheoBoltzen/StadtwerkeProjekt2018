import * as React from "react";
import "../DevelopmentForms/DevelopmentForms.css";
import Button from "@material-ui/core/es/Button/Button";
import { ListItem } from "../DevelopmentForms/ListItem";
import { AllProps, State } from "./TraineeView";
import { CircularProgress } from "@material-ui/core";
import { DetailviewDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewDevelopmentSheetComponent";
import { FillOutDevelopmentSheet } from "../FillOutDevelopmentSheet/FillOutDevelopmentSheet"; //später
//import IconButton from "@material-ui/core/es/IconButton/IconButton";
//import ClearIcon from "@material-ui/icons/Clear";

export class TraineeViewComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: true,
      isHidden: true,
      showFillOutDialog: false
    };
  }

  openFillOutDialog = () => {
    this.setState({
      showFillOutDialog: !this.state.showFillOutDialog,
      isHidden: true
    });
  };

  handleSearchClick = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      showFillOutDialog: false
    });
  };

  setAssignmentDevSheet = id => {
    this.props.setAssignment(this.props.user.username, id);
  };

  componentDidMount() {
    this.props.getAllDevForms();

    this.props.getDevFormsListTrainee(this.props.user.username);
    //console.log("-----------------------" + this.props.user.username);
    // this.props.user.TraineeUsername = this.props.user.username;
    // console.log("-----------------------" + this.props.user.TraineeUsername);
  }

  changeVisibilityIndex = () => {
    this.setState({ visibilityIndex: !this.state.visibilityIndex });
  };

  doFormatDate = date => {
    //date format from db: 	2018-12-03T12:12:26.000Z
    return new Date(date).toLocaleDateString("de");
  };

  getContent = () => {
    const {
      developmentForms,
      loading,
      loadingTraineeDevSheets,
      traineeDevelopmentFormsList
    } = this.props; //taineeDevelopmentFormsList
    console.log("++++++++++++++++++++++", traineeDevelopmentFormsList);
    console.log("++++++++++++++++++++++", loadingTraineeDevSheets);
    const { isHidden, showFillOutDialog } = this.state;

    //DetailviewDevelopmentSheetComponent muss beim Klick die die id des Entwicklungsbogens mitgegeben werden!
    return showFillOutDialog ? (
      <FillOutDevelopmentSheet />
    ) : this.state.visibilityIndex ? (
      <div className={"switchRoot"}>
        <div className={"flexDiv"}>
          <div />
          <Button
            variant={"contained"}
            color={"primary"}
            className={"entwicklungsBogenButton"}
            onClick={this.changeVisibilityIndex}>
            Finde Entwicklungsbögen
          </Button>
          <Button onClick={this.openFillOutDialog}>FillOut</Button>
        </div>
        Hallo hier ist Content!
        {loadingTraineeDevSheets ? (
          <CircularProgress />
        ) : (
          <div className={"frame center"}>
            <ListItem
              isHeader={true}
              abteilung="Abteilung"
              job="Ausbildungsberuf"
              date="Erstellungsdatum"
            />
            {traineeDevelopmentFormsList.map((devForm, index) => {
              return (
                <ListItem
                  key={index}
                  //is displayed
                  abteilung={devForm.status}
                  job={devForm.traineeUsername}
                  date={this.doFormatDate(devForm.createdAt)}
                  //
                  onSearchClick={this.handleSearchClick}
                  onAssignMeClick={() => this.setAssignmentDevSheet(devForm.id)}
                  isTrainee={true}
                />
              );
            })}
          </div>
        )}
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
              />
              {developmentForms.map((devForm, index) => {
                return (
                  <ListItem
                    key={index}
                    abteilung={devForm.department}
                    job={devForm.education}
                    date={this.doFormatDate(devForm.createdAt)}
                    onSearchClick={this.handleSearchClick}
                    onAssignMeClick={() => this.setAssignmentDevSheet(devForm.id)}
                    isTrainee={true}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <DetailviewDevelopmentSheetComponent />
          </div>
        )}
      </div>
    );
  };

  render() {
    console.log("testLoad: ", this.props);
    return <div className={"root"}>{this.getContent()}</div>;
  }
}
