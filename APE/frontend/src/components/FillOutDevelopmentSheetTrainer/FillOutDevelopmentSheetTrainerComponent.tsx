import * as React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Tooltip,
  Typography
} from "@material-ui/core";
import CustomizedButtonRed from "../General/CustomizedButtonRed";
import CustomizedRadio from "../General/CustomizedRadio";
import CustomizedButton from "../General/CustomizedButton";
import { AllProps, State } from "./FillOutDevelopmentSheetTrainer";
import "./FillOutDevelopmentSheetTrainerComponent.css";
import LabelWithTextfield from "../DetailviewDevelopmentSheet/LabelWithTextfield";
import { DevSheetStatusConstants } from "../../constants";

export const styles = theme => ({
  customWidth: {
    maxWidth: 340
  }
});

export class FillOutDevelopmentSheetTrainerComponent extends React.Component<AllProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: [],
      open: false
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  private setEstimationTrainer = async () => {
    const { setTrainerEstimation, fullDevSheet, goBack } = this.props;
    await this.setAssessmentsTrainer();
    await setTrainerEstimation(fullDevSheet.result.devSheetid, fullDevSheet.result.trainee);
    goBack();
  };

  private setAssessmentsTrainer = async () => {
    const { setTrainerAssessment } = this.props;
    let arr = [] as any;

    this.state.radioValue.map(r => {
      const assessementObj = {
        id: r.id,
        trainerAssessment: r.value.toString() === "" ? null : r.value.toString()
      };

      arr.push(assessementObj);
    });

    await setTrainerAssessment(arr);
  };

  private setAssessmentsTrainerSave = async () => {
    const { goBack } = this.props;
    await this.setAssessmentsTrainer();
    goBack();
  };

  render() {
    const { radioValue } = this.state;
    const { fullDevSheet, loading, loadingSave, loadingStatus, classes } = this.props;

    const legend =
      "1 = in vollem Maße, 2 = weitgehend, 3 = teilweise, 4 = unzureichend, 5 = nicht, " +
      "grün = Zielwert, blau = Einschätzung Auszubildender, rot = Einschätzung Ausbilder ";

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
              <Tooltip title={legend} classes={{ tooltip: classes.customWidth }}>
                <Button>Legende</Button>
              </Tooltip>
              {loadingStatus ? (
                <CircularProgress />
              ) : (
                <CustomizedButtonRed
                  onClick={this.handleClickOpen}
                  text={"Fertigstellen"}
                  disabled={
                    fullDevSheet.result.status === DevSheetStatusConstants.completed ||
                    fullDevSheet.result.status === DevSheetStatusConstants.rated
                  }
                />
              )}
            </div>
          </div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Soll der Entwicklungsbogen wirklich fertiggestellt werden?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Durch das Fertigstellen dieses Entwicklungsbogens, kannst du keine Änderungen mehr
                vornehmen.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Nein
              </Button>
              <Button onClick={this.setEstimationTrainer} color="primary" autoFocus>
                Ja
              </Button>
            </DialogActions>
          </Dialog>

          <div className="div-headerFill" id="frameFill">
            <div className="div-leftFill">
              <LabelWithTextfield
                name={"Ausbildungsbeauftragter"}
                content={fullDevSheet.result.trainer}
              />
              <LabelWithTextfield name={"Auszubildener"} content={fullDevSheet.result.trainee} />
            </div>
            <div className="div-rightFill">
              <LabelWithTextfield name={"Abteilung"} content={fullDevSheet.result.department} />
              <LabelWithTextfield
                name={"Ausbildungsberuf"}
                content={fullDevSheet.result.education}
              />
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
                                  : criteria.trainerassessment
                                  ? criteria.trainerassessment.toString()
                                  : ""
                              }
                              row={true}>
                              <FormControlLabel
                                value={"1"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 1}
                                    isTrainee={criteria.traineeassessment === 1}
                                    isTrainer={true}
                                  />
                                }
                                label={"1"}
                              />
                              <FormControlLabel
                                value={"2"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 2}
                                    isTrainee={criteria.traineeassessment === 2}
                                    isTrainer={true}
                                  />
                                }
                                label={"2"}
                              />
                              <FormControlLabel
                                value={"3"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 3}
                                    isTrainee={criteria.traineeassessment === 3}
                                    isTrainer={true}
                                  />
                                }
                                label={"3"}
                              />
                              <FormControlLabel
                                value={"4"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 4}
                                    isTrainee={criteria.traineeassessment === 4}
                                    isTrainer={true}
                                  />
                                }
                                label={"4"}
                              />
                              <FormControlLabel
                                value={"5"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 5}
                                    isTrainee={criteria.traineeassessment === 5}
                                    isTrainer={true}
                                  />
                                }
                                label={"5"}
                              />
                              <FormControlLabel
                                value={""}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === null}
                                    isTrainee={criteria.traineeassessment === null}
                                    isTrainer={true}
                                  />
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
                  onClick={this.setAssessmentsTrainerSave}
                  text={"Speichern"}
                  disabled={
                    fullDevSheet.result.status === DevSheetStatusConstants.completed ||
                    fullDevSheet.result.status === DevSheetStatusConstants.rated
                  }
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
