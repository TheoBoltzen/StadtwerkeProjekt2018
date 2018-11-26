import * as React from "react";
import {
  WithStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";
import "./DevelopmentStepper.css";
import { styles } from "./mUIstyles";
import { getSteps } from "../../helpers";
import { DepartmentProfession } from "./Steps/department-profession";
import CompetenceCreation from "./Steps/CompetenceCreation";

interface State {
  activeStep: number;
  department: string;
  profession: string;
  developmentForm: string[];
  competenceCounter: number;
}

interface Props extends WithStyles<typeof styles> {}

class DevelopmentStepper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeStep: 0,
      department: "",
      profession: "",
      developmentForm: [],
      competenceCounter: 0
    };
  }

  handleChange = (event: any) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as State);
    console.log(this.state.developmentForm);
  };

  addCompetence = () => {
    const developmentForm = this.state.developmentForm;
    let competenceCounter = this.state.competenceCounter;
    competenceCounter = competenceCounter + 1;
    developmentForm.push("Kompetenzkategorie " + competenceCounter);
    this.setState({ competenceCounter });
    this.setState({ developmentForm });
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <DepartmentProfession
            department={this.state.department}
            profession={this.state.profession}
            onChange={this.handleChange}
          />
        );
      case 1:
        return (
          <CompetenceCreation
            developmentForm={this.state.developmentForm}
            /*
            onChange={this.handleRename}
*/
            onClickAddButton={this.addCompetence}
            classes={this.props.classes}
            name={"developmentForm"}
          />
        );
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

  handleReset = () => {};

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={"root"}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label} className={classes.step}>
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
                  <Button
                    variant="contained"
                    className={classes.primaryButton}
                    onClick={this.handleNext}>
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
