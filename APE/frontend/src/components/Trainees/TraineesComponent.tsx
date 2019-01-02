import * as React from "react";
import { AllProps } from "./Trainees";
import { CircularProgress } from "@material-ui/core";
import { ListItemTrainee } from "./ListItemTrainee";
import "./TraineesComponent.css";

export class TraineesComponent extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTrainees();
  }

  render() {
    const { loading, trainees } = this.props;
    return loading ? (
      <CircularProgress />
    ) : (
      <div className={"frameCenterTraineeTab"}>
        <ListItemTrainee
          isHeader={true}
          name={"Name"}
          username={"Kennung"}
          firstname={"Vorname"}
          education={"Ausbildungsberuf"}
        />
        {trainees.map((trainee, index) => (
          <ListItemTrainee
            key={index}
            name={trainee.lastname}
            username={trainee.username}
            firstname={trainee.firstname}
            education={trainee.education}
          />
        ))}
      </div>
    );
  }
}
