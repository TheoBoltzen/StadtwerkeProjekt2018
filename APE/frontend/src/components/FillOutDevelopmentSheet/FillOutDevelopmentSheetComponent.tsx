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
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { DevSheetStatusConstants } from "../../constants";

export const styles = theme => ({
  customWidth: {
    maxWidth: 340
  }
});

export class FillDevelopmentSheetComponent extends React.Component<AllProps, State> {
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

  private setEstimationTrainee = async () => {
    const { setTraineeEstimation, fullDevSheet, goBack } = this.props;
    await this.setAssessmentsTrainee();
    await setTraineeEstimation(fullDevSheet.result.devSheetid);
    goBack();
  };

  private setCompletionTrainee = async () => {
    const { fullDevSheet, goBack, setTraineeCompletion } = this.props;
    await setTraineeCompletion(fullDevSheet.result.devSheetid);
    goBack();
  };

  private setAssessmentsTrainee = async () => {
    const { setTraineeAssessment } = this.props;
    let arr = [] as any;

    this.state.radioValue.map(r => {
      const assessementObj = {
        id: r.id,
        traineeAssessment: r.value.toString() === "" ? null : r.value.toString()
      };

      arr.push(assessementObj);
    });

    await setTraineeAssessment(arr);
  };

  private setAssessmentsTraineeSave = async () => {
    const { goBack } = this.props;
    await this.setAssessmentsTrainee();
    goBack();
  };

  render() {
    const { radioValue } = this.state;
    const { fullDevSheet, loading, loadingSave, loadingStatus, classes } = this.props;

    const legend =
      "1 = in vollem Maße, 2 = weitgehend, 3 = teilweise, 4 = unzureichend, 5 = nicht, " +
      "grün = Zielwert, blau = Einschätzung Auszubildender, rot = Einschätzung Ausbilder ";

    const isRated = fullDevSheet.result.status === DevSheetStatusConstants.rated;
    const isAssigned = fullDevSheet.result.status === DevSheetStatusConstants.assigned;

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
                  text={isRated ? "Unterschreiben" : "Abgeben"}
                  disabled={!isRated && !isAssigned}
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
              {isRated
                ? "Soll der Entwicklungsbogen wirklich unterschrieben werden?"
                : "Soll der Entwicklungsbogen wirklich abgegeben werden?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {isRated
                  ? "Durch das Setzen deiner digitalen Unterschrift nimmst du die angezeigten Werte zur Kentniss und bist mit diesen Einverstanden."
                  : "Durch das Abgeben dieses Bogens, kannst du keine Änderungen mehr vornehmen und dein Ausbilder wird sich mit dir für die Evaluation in Verbindung setzen."}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Nein
              </Button>
              <Button
                onClick={isRated ? this.setCompletionTrainee : this.setEstimationTrainee}
                color="primary"
                autoFocus>
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
                                isRated
                                  ? criteria.trainerassessment
                                    ? criteria.trainerassessment.toString()
                                    : ""
                                  : radioValue.find(r => r.name === criteria.name)
                                  ? radioValue[radioValue.findIndex(r => r.name === criteria.name)]
                                      .value
                                  : criteria.traineeassessment
                                  ? criteria.traineeassessment.toString()
                                  : ""
                              }
                              row={true}>
                              <FormControlLabel
                                value={"1"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 1}
                                    isTrainer={criteria.trainerassessment === 1}
                                    isTrainee={isRated && criteria.traineeassessment === 1}
                                  />
                                }
                                label={"1"}
                              />
                              <FormControlLabel
                                value={"2"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 2}
                                    isTrainer={criteria.trainerassessment === 2}
                                    isTrainee={isRated && criteria.traineeassessment === 2}
                                  />
                                }
                                label={"2"}
                              />
                              <FormControlLabel
                                value={"3"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 3}
                                    isTrainer={criteria.trainerassessment === 3}
                                    isTrainee={isRated && criteria.traineeassessment === 3}
                                  />
                                }
                                label={"3"}
                              />
                              <FormControlLabel
                                value={"4"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 4}
                                    isTrainer={criteria.trainerassessment === 4}
                                    isTrainee={isRated && criteria.traineeassessment === 4}
                                  />
                                }
                                label={"4"}
                              />
                              <FormControlLabel
                                value={"5"}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === 5}
                                    isTrainer={criteria.trainerassessment === 5}
                                    isTrainee={isRated && criteria.traineeassessment === 5}
                                  />
                                }
                                label={"5"}
                              />
                              <FormControlLabel
                                value={""}
                                control={
                                  <CustomizedRadio
                                    isGoalCross={criteria.goalCross === null}
                                    isTrainer={isRated && criteria.trainerassessment === null}
                                    isTrainee={
                                      fullDevSheet.result.status ===
                                        DevSheetStatusConstants.rated &&
                                      criteria.traineeassessment === null
                                    }
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
                  onClick={this.setAssessmentsTraineeSave}
                  text={"Speichern"}
                  disabled={!isAssigned}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
