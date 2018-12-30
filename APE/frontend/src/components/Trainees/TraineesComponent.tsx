import * as React from "react";
import { AllProps } from "./Trainees";

export class TraineesComponent extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTrainees();
  }

  render() {
    console.log("Props: ", this.props);
    return <div>Auszubildende</div>;
  }
}
