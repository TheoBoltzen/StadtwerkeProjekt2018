import * as React from "react";
import { AllProps } from "./Trainees";
import { CircularProgress } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";

interface State {}

export class TraineesComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);
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
  private handleFillOut = () => {
    console.log("fill out");
  };

  render() {
    const { loading, connectedDevSheets } = this.props;

    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"frameCenterTraineeTab"}>
        <ListItemTrainee
          isHeader={true}
          department={"Abteilung"}
          nameTrainee={"Name des zugewiesenen Auszubildenden"}
          nameTrainer={"Name des zugewiesenen Ausbilders"}
        />

        {connectedDevSheets.map((devSheet, index) => (
          <ListItemTrainee
            key={index}
            nameTrainee={devSheet.TraineeUsername}
            department={devSheet.DevelopmentSheet.department}
            nameTrainer={devSheet.TrainerUsername}
            onAssignmentClick={() => this.handleAssignment(devSheet.TraineeUsername, devSheet.id)}
            onFilloutClick={this.handleFillOut}
          />
        ))}
      </div>
    );
  }
}