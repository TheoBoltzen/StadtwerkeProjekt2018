import * as React from "react";
import { AllProps } from "./Trainees";
import { CircularProgress } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";

interface State {}

export class TraineesComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getAllConnectedDevSheets();
  }

  // Klick auf mir zuweisen
  handleAssignment = () => {
    console.log("assign");
  };

  // Klick auf Ausfüllen
  handleFillOut = () => {
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
          onAssignmentClick={this.handleAssignment()}
          onFilloutClick={this.handleFillOut()}
        />

        {connectedDevSheets.map((devSheet, index) => (
          <ListItemTrainee
            key={index}
            nameTrainee={devSheet.TraineeUsername}
            department={devSheet.DevelopmentSheet.department}
            nameTrainer={devSheet.TrainerUsername}
            onAssignmentClick={this.handleAssignment}
            onFilloutClick={this.handleFillOut}
          />
        ))}
      </div>
    );
  }
}
