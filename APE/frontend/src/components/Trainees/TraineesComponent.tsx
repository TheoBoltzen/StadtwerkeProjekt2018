import * as React from "react";
import { AllProps, State } from "./Trainees";
import { CircularProgress, Typography } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";
import { FillOutDevelopmentSheetTrainer } from "../FillOutDevelopmentSheetTrainer/FillOutDevelopmentSheetTrainer";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { DetailviewAssessmentDevelopmentSheetComponent } from "../DetailviewDevelopmentSheet/DetailviewAssessmentDevelopmentSheetComponent";

export class TraineesComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      visibilityIndex: "connected-dev-sheets"
    };
  }

  componentDidMount() {
    this.props.getAllConnectedDevSheets();
  }

  // Klick auf mir zuweisen
  private handleAssignment = async (traineeUsername, devSheetId) => {
    try {
      const { setDevSheetToTrainer, getAllConnectedDevSheets } = this.props;
      await setDevSheetToTrainer(traineeUsername, devSheetId);
      getAllConnectedDevSheets();
    } catch (e) {
      console.log(e);
    }
  };

  // Klick auf Ausfüllen
  private handleFillOut = (devSheetID, traineeUsername) => {
    this.props.getFullDevSheet(devSheetID, traineeUsername);
    this.changeVisiblityIndex("fill-out");
  };

  private changeVisiblityIndex = visiblityIndex => {
    this.setState({
      visibilityIndex: visiblityIndex
    });
  };

  private handleSearch = (devSheetID, traineeUsername) => {
    this.props.getFullDevSheet(devSheetID, traineeUsername);
    this.changeVisiblityIndex("detail-view");
  };

  private renderContent = () => {
    const { visibilityIndex } = this.state;
    const { connectedDevSheets, loadingFullDevSheet, fullDevSheet } = this.props;

    switch (visibilityIndex) {
      case "connected-dev-sheets":
        return (
          <div className={"frameCenterTraineeTab"}>
            <ListItemTrainee
              isHeader={true}
              department={"Abteilung"}
              nameTrainee={"Kennung des zugewiesenen Auszubildenden"}
              nameTrainer={"Kennung des zugewiesenen Ausbilders"}
              status={"Status"}
            />

            {connectedDevSheets.map((devSheet, index) => (
              <ListItemTrainee
                key={index}
                nameTrainee={devSheet.TraineeUsername}
                department={devSheet.DevelopmentSheet.department}
                nameTrainer={devSheet.TrainerUsername}
                status={devSheet.status}
                onAssignmentClick={() =>
                  this.handleAssignment(devSheet.TraineeUsername, devSheet.DevelopmentSheetId)
                }
                onFilloutClick={() =>
                  this.handleFillOut(devSheet.DevelopmentSheetId, devSheet.TraineeUsername)
                }
                onSearchClick={() =>
                  this.handleSearch(devSheet.DevelopmentSheetId, devSheet.TraineeUsername)
                }
              />
            ))}
          </div>
        );
      case "fill-out":
        return (
          <div>
            <div className={"buttonDiv"}>
              <div />
              <IconButton
                color={"primary"}
                className={"crossButton"}
                onClick={() => {
                  this.changeVisiblityIndex("connected-dev-sheets");
                }}>
                <ClearIcon />
              </IconButton>
            </div>
            <FillOutDevelopmentSheetTrainer
              loading={loadingFullDevSheet}
              fullDevSheet={fullDevSheet}
              goBack={() => this.changeVisiblityIndex("connected-dev-sheets")}
            />
          </div>
        );
      case "detail-view":
        return (
          <div>
            <div className={"buttonDiv"}>
              <div />
              <IconButton
                color={"primary"}
                className={"crossButton"}
                onClick={() => {
                  this.changeVisiblityIndex("connected-dev-sheets");
                }}>
                <ClearIcon />
              </IconButton>
            </div>
            <DetailviewAssessmentDevelopmentSheetComponent
              fullDevSheetDetail={fullDevSheet}
              loading={loadingFullDevSheet}
              id={fullDevSheet.result.devSheetid}
            />
          </div>
        );
      default:
        return (
          <div>
            <Typography variant={"h2"}>Upps, hier lief etwas schief</Typography>
          </div>
        );
    }
  };

  render() {
    const { loading } = this.props;

    return loading ? <CircularProgress /> : this.renderContent();
  }
}
