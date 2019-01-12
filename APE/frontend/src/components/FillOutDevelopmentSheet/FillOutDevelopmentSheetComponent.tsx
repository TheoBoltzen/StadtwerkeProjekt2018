import * as React from "react";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography
} from "@material-ui/core";
import { AllProps, State } from "./FillOutDevelopmentSheet";
import "./FillOutDevelopmentSheetComponent.css";
import LabelWithTextfield from "../DetailviewDevelopmentSheet/LabelWithTextfield";
import CustomizedRadio from "../General/CustomizedRadio";
import CustomizedButton from "../General/CustomizedButton";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import CustomizedButtonRed from "../General/CustomizedButtonRed";

export class FillDevelopmentSheetComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: []
    };
  }

  private handleChange = (event, id) => {
    let radioValueArray = this.state.radioValue;

    if (radioValueArray.find(r => r.name === event.target.name)) {
      radioValueArray[radioValueArray.findIndex(r => r.name === event.target.name)].value =
        event.target.value;
    } else {
      radioValueArray = [
        ...radioValueArray,
        { name: event.target.name, value: event.target.value, id: id }
      ];
    }

    this.setState({
      radioValue: radioValueArray
    });
  };

  private setEstimationTrainee = async () => {
    const { setTraineeEstimation, fullDevSheet, goBack } = this.props;
    await setTraineeEstimation(fullDevSheet.result.devSheetid);
    goBack();
  };

  private setAssessmentsTrainee = async () => {
    const { goBack, setTraineeAssessment } = this.props;
    let arr = [] as any;

    this.state.radioValue.map(r => {
      const assessementObj = {
        id: r.id,
        traineeAssessment: r.value.toString() === "" ? null : r.value.toString()
      };

      arr.push(assessementObj);
    });

    await setTraineeAssessment(arr);
    goBack();
  };

  render() {
    console.log("FullDev: ", this.props.fullDevSheet.result);
    console.log("state: ", this.state);

    const { radioValue } = this.state;
    const { fullDevSheet, loading, loadingSave, loadingStatus } = this.props;

    const legend = "1 = in vollem Maße, 2 = weitgehend, 3 = teilweise, 4 = unzureichend, 5 = nicht";

    return loading ? (
      <CircularProgress />
    ) : (
      <React.Fragment>
        <div className={"fillOutRoot"}>
          <div className={"fillOutHeader"}>
            <Typography variant={"h4"}>
              Entwicklungsbogen für Auszubildende der Stadtwerke Kiel
            </Typography>
          </div>

          <div className={"buttonDivFillOut"}>
            <div />
            <div>
              <Tooltip title={legend}>
                <Button>Legende</Button>
              </Tooltip>
              {loadingStatus ? (
                <CircularProgress />
              ) : (
                <CustomizedButtonRed
                  onClick={this.setEstimationTrainee}
                  text={"Abgeben"}
                  disabled={fullDevSheet.result.status !== "Zugewiesen"}
                />
              )}
            </div>
          </div>

          <div className="div-headerFill" id="frameFill">
            <div className="div-leftFill">
              <LabelWithTextfield name={"Abteilung"} content={fullDevSheet.result.department} />
              <LabelWithTextfield
                name={"Ausbildungsbeauftragter"}
                content={fullDevSheet.result.trainer}
              />
              <LabelWithTextfield name={"Auszubildener"} content={fullDevSheet.result.trainee} />
              <LabelWithTextfield
                name={"Ausbildungsberuf"}
                content={fullDevSheet.result.education}
              />
            </div>
            <div className="div-rightFill">
              <LabelWithTextfield name={"Datum"} content={""} />
              <LabelWithTextfield name={"Ausbildungszeitraum"} content={""} />
              <LabelWithTextfield name={"Ausbildungsjahr"} content={""} />
              <LabelWithTextfield name={"Abwesenheitstage"} content={""} />
            </div>
          </div>

          {fullDevSheet.result.content.map(competence => (
            <div key={competence.name} id={"frameFill"}>
              <h3>{competence.name}</h3>
              {competence.children.map(mainCategory => (
                <div className={"gravity-leftFill"} key={mainCategory.name}>
                  <h4>{mainCategory.name}</h4>
                  {mainCategory.children.map(subCategory => (
                    <div className={"gravity-leftFill"} id={"border"} key={subCategory.name}>
                      <h5>{subCategory.name}</h5>
                      {subCategory.children.map(criteria => (
                        <div className={"criteria-container"} key={criteria.name}>
                          <legend className={"criteria-text"}>{criteria.name}</legend>
                          <FormControl component={"fieldset"}>
                            <RadioGroup
                              name={criteria.name}
                              onChange={event => this.handleChange(event, criteria.id)}
                              value={
                                radioValue.find(r => r.name === criteria.name)
                                  ? radioValue[radioValue.findIndex(r => r.name === criteria.name)]
                                      .value
                                  : criteria.traineeassessment
                                  ? criteria.traineeassessment.toString()
                                  : ""
                              }
                              row={true}>
                              <FormControlLabel
                                value={"1"}
                                control={<CustomizedRadio isGoalCross={criteria.goalCross === 1} />}
                                label={"1"}
                              />
                              <FormControlLabel
                                value={"2"}
                                control={<CustomizedRadio isGoalCross={criteria.goalCross === 2} />}
                                label={"2"}
                              />
                              <FormControlLabel
                                value={"3"}
                                control={<CustomizedRadio isGoalCross={criteria.goalCross === 3} />}
                                label={"3"}
                              />
                              <FormControlLabel
                                value={"4"}
                                control={<CustomizedRadio isGoalCross={criteria.goalCross === 4} />}
                                label={"4"}
                              />
                              <FormControlLabel
                                value={"5"}
                                control={<CustomizedRadio isGoalCross={criteria.goalCross === 5} />}
                                label={"5"}
                              />
                              <FormControlLabel
                                value={""}
                                control={
                                  <CustomizedRadio isGoalCross={criteria.goalCross === null} />
                                }
                                label={"keine Angabe"}
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div className={"buttonDivFillOut"}>
            <div />
            <div className={"buttonMargin"}>
              {loadingSave ? (
                <CircularProgress />
              ) : (
                <CustomizedButton
                  onClick={this.setAssessmentsTrainee}
                  text={"Speichern"}
                  disabled={fullDevSheet.result.status !== "Zugewiesen"}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
