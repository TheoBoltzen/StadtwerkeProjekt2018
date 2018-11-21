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
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/es/List/List";

const styles = theme => ({
  root: {
    width: "90%"
  },
  stepper: {
    backgroundColor: "#f9f9f9",
    iconColor: "#00a8e1"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  primaryButton: {
    backgroundColor: "#00a8e1 !important",
    color: "white"
  },
  step: {
    iconColor: "#00a8e1"
  },
  addButton: {
    margin: theme.spacing.unit
  },
  deleteButton: {
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: "none"
    }
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
  };

  addCompetence = () => {
    const developmentForm = this.state.developmentForm;
    let competenceCounter = this.state.competenceCounter;
    competenceCounter = competenceCounter + 1;
    developmentForm.push("Kompetenz " + competenceCounter);
    this.setState({ competenceCounter });
    this.setState({ developmentForm });
  };

  handleCompetenceDelete = id => {
    console.log(id);
    /*
    this.setState(prevState => ({
        developmentForm: prevState.developmentForm.filter(el => el != id)
    }))*/
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
        return (
          <div className={"step2"}>
            <List className={"list"}>
              {this.state.developmentForm.map((competence, index) => (
                <ListItem key={index}>
                  <ListItemText primary={competence} />
                  <ListItemSecondaryAction>
                    <IconButton
                      className={this.props.classes.deleteButton}
                      aria-label={"Delete"}
                      onClick={this.handleCompetenceDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Button
              color={"primary"}
              variant={"fab"}
              mini
              aria-label={"Add"}
              className={this.props.classes.addButton}
              onClick={this.addCompetence}>
              <AddIcon />
            </Button>
          </div>
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
