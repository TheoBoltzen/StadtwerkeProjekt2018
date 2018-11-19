import * as React from "react";
import { InputLabel, WithStyles } from "@material-ui/core";
import Stepper from "@material-ui/core/es/Stepper/Stepper";
import Step from "@material-ui/core/es/Step/Step";
import StepLabel from "@material-ui/core/es/StepLabel/StepLabel";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CustomizedInput from "../General/CustomizedInput";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import "./DevelopmentStepper.css";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return [
    "Abteilung und Ausbildungsberuf angeben",
    "Kompetenzkategorien erstellen",
    "Hauptkategorien erstellen",
    "Unterkategorien erstellen",
    "Bewertungskriterien angeben"
  ];
}

interface State {
  activeStep: number;
  department: string;
  profession: string;
}

interface Props extends WithStyles<typeof styles> {}

class DevelopmentStepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeStep: 0,
      department: "",
      profession: ""
    };
  }

  handleChange = (event: any) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as State);
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <div className={"step1"}>
            <Typography variant={"subtitle2"} className={"TaskDescription"}>
              Gib den Ausbildungsberuf und die Abteilung an, für den der Entwicklungsbogen benutzt
              werden soll
            </Typography>

            <div className={"step1Form"}>
              <FormControl className={"DepartmentForm"}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Abteilung
                </InputLabel>
                <CustomizedInput
                  name={"department"}
                  value={this.state.department}
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl className={"ProfessionForm"}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Ausbildungsberuf
                </InputLabel>
                <CustomizedInput
                  name={"profession"}
                  value={this.state.profession}
                  onChange={this.handleChange}
                />
              </FormControl>
            </div>
          </div>
        );
      case 1:
        return "Platzhalter";
      case 2:
        return "Platzhalter";
      default:
        return "Platzhalter";
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    //TODO: an Modal durchgeben, dass Dialog abgeschlossen ist und Modal geschlossen werden kann. Oder in tenären Operator am Ende
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={"root"}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>Bewertungsbogen erstellt!</Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {this.getStepContent(activeStep)}
                </Typography>
                <div className={"StepperButtons"}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}>
                    Zurück
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? "Fertig" : "Weiter"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DevelopmentStepper);
