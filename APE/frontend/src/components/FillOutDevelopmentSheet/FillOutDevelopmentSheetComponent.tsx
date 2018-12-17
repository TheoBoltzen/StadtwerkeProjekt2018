import * as React from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { AllProps, State } from "./FillOutDevelopmentSheet";
import "./FillOutDevelopmentSheetComponent.css";
import { LabelWithTextfield } from "../DetailviewDevelopmentSheet/LabelWithTextfield";

export class FillDevelopmentSheetComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "3"
    };
  }

  private handleChange = event => {
    console.log("event: ", event.target.value);
    this.setState({
      radioValue: event.target.value
    });
  };

  render() {
    const { radioValue } = this.state;

    return (
      <React.Fragment>
        <div className="div-header" id="frame">
          <div className="div-left">
            <LabelWithTextfield name={"Abteilung"} content={""} />
            <LabelWithTextfield name={"Ausbildungsbeauftragter"} content={""} />
            <LabelWithTextfield name={"Auszubildener"} content={""} />
            <LabelWithTextfield name={"Ausbildungsberuf"} content={""} />
          </div>
          <div className="div-right">
            <LabelWithTextfield name={"Datum"} content={""} />
            <LabelWithTextfield name={"Ausbildungszeitraum"} content={""} />
            <LabelWithTextfield name={"Ausbildungsjahr"} content={""} />
            <LabelWithTextfield name={"Abwesenheitstage"} content={""} />
          </div>
        </div>

        <div className={"criteria-container"}>
          <legend className={"criteria-text"}>Test</legend>
          <FormControl component={"fieldset"}>
            <RadioGroup name={"test"} onChange={this.handleChange} value={radioValue} row={true}>
              <FormControlLabel value={"1"} control={<Radio color={"primary"} />} label={""} />
              <FormControlLabel value={"2"} control={<Radio color={"primary"} />} label={""} />
              <FormControlLabel value={"3"} control={<Radio color={"primary"} />} label={""} />
              <FormControlLabel value={"4"} control={<Radio color={"primary"} />} label={""} />
              <FormControlLabel value={"5"} control={<Radio color={"primary"} />} label={""} />
            </RadioGroup>
          </FormControl>
        </div>
      </React.Fragment>
    );
  }
}
