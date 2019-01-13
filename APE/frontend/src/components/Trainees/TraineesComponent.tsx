import * as React from "react";
import { AllProps, State } from "./Trainees";
import { CircularProgress, Typography } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";

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
    console.log("fill out");
    this.setState({
      visibilityIndex: "fill-out"
    });

    this.props.getFullDevSheet(devSheetID, traineeUsername);
  };

  private renderContent = () => {
    const { visibilityIndex } = this.state;
    const { connectedDevSheets } = this.props;

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
                  this.handleAssignment(devSheet.TraineeUsername, devSheet.id)
                }
                onFilloutClick={() => this.handleFillOut(devSheet.id, devSheet.TraineeUsername)}
              />
            ))}
          </div>
        );
      case "fill-out":
        return <div>Test</div>;
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

    console.log("Props: ", this.props);

    return loading ? <CircularProgress /> : this.renderContent();
  }
}
