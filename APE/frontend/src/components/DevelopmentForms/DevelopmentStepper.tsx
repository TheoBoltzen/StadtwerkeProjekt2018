import * as React from "react";
import {
  WithStyles,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import "./DevelopmentStepper.css";
import { styles } from "./mUIstyles";
import { getSteps } from "../../helpers";
import { DepartmentProfession } from "./Steps/department-profession";
import CompetenceCreation, { Competence } from "./Steps/CompetenceCreation";
import MainCategoryCreation from "./Steps/MainCategoryCreation";
import SubCategoryCreation from "./Steps/SubCategoryCreation";
import CriteriaCreation from "./Steps/CriteriaCreation";
import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { CompetenceFetch, CriteriaFetch, MainCategoryFetch, SubCategoryFetch } from "../../types";
import {
  getAllCompetences,
  getAllCriteria,
  getAllMainCategories,
  getAllSubCategories
} from "../../redux/actions/development-forms-actions";

interface State {
  activeStep: number;
  department: string;
  profession: string;
  developmentForm: Competence[];
}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly competences: CompetenceFetch[];
  readonly mainCategories: MainCategoryFetch[];
  readonly subCategories: SubCategoryFetch[];
  readonly criteria: CriteriaFetch[];
}

interface ReduxDispatchProps {
  readonly getAllCompetences: () => void;
  readonly getAllMainCategories: (competenceName: string) => void;
  readonly getAllSubCategories: (mainCategoryName: string) => void;
  readonly getAllCriteria: (subCategoryName: string) => void;
}

interface Props extends WithStyles<typeof styles> {}

export type AllProps = ReduxStateProps & ReduxDispatchProps & Props;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const {
    loading,
    competences,
    mainCategories,
    subCategories,
    criteria
  } = state.singleDevelopmentFormReducer;
  return {
    loading,
    competences,
    mainCategories,
    subCategories,
    criteria
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllCompetences: () => dispatch(getAllCompetences()),
    getAllMainCategories: (competenceName: string) =>
      dispatch(getAllMainCategories(competenceName)),
    getAllSubCategories: (mainCategoryName: string) =>
      dispatch(getAllSubCategories(mainCategoryName)),
    getAllCriteria: (subCategoryName: string) => dispatch(getAllCriteria(subCategoryName))
  };
};

class DevelopmentStepper extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      activeStep: 0,
      department: "",
      profession: "",
      developmentForm: []
    };
  }

  componentWillReceiveProps(nextProps: AllProps) {
    const { developmentForm } = this.state;
    const { competences } = this.props;
    if (nextProps.competences !== competences) {
      const developmentFormState = developmentForm;
      nextProps.competences.map(competence => {
        if (!developmentFormState.find(c => c.name === competence.name)) {
          developmentFormState.push({
            name: competence.name,
            checked: false,
            open: false,
            MainCategories: [],
            imported: true
          });
        }
      });

      this.setState({ developmentForm: developmentFormState });
    }

    if (nextProps.mainCategories != this.props.mainCategories) {
      const developmentFormState = developmentForm;
      this.state.developmentForm.map((competence, index) => {
        nextProps.mainCategories.map(mainCategory => {
          if (!developmentForm[index].MainCategories.find(m => m.name === mainCategory.name)) {
            if (competence.name === mainCategory.CompetencyCategoryName) {
              developmentFormState[index].MainCategories.push({
                name: mainCategory.name,
                checked: false,
                open: false,
                SubCategories: [],
                imported: true
              });
            }
          }
        });
      });
      this.setState({ developmentForm: developmentFormState });
    }

    if (nextProps.subCategories != this.props.subCategories) {
      const developmentFormState = developmentForm;
      this.state.developmentForm.map((competence, index) => {
        this.state.developmentForm[index].MainCategories.map((mainCategory, index2) => {
          nextProps.subCategories.map(subCategory => {
            if (
              !developmentForm[index].MainCategories[index2].SubCategories.find(
                s => s.name === subCategory.name
              )
            ) {
              if (mainCategory.name === subCategory.MainCategoryName) {
                developmentFormState[index].MainCategories[index2].SubCategories.push({
                  name: subCategory.name,
                  checked: false,
                  open: false,
                  Criteria: [],
                  imported: true
                });
              }
            }
          });
        });
      });
      this.setState({ developmentForm: developmentFormState });
    }

    if (nextProps.criteria !== this.props.criteria) {
      const developmentFormState = developmentForm;

      this.state.developmentForm.map((competence, index) => {
        this.state.developmentForm[index].MainCategories.map((mainCategory, index2) => {
          this.state.developmentForm[index].MainCategories[index2].SubCategories.map(
            (subCategory, index3) => {
              nextProps.criteria.map(critera => {
                if (
                  !developmentForm[index].MainCategories[index2].SubCategories[
                    index3
                  ].Criteria.find(c => c.name === critera.name)
                ) {
                  if (subCategory.name === critera.SubCategoryName) {
                    developmentFormState[index].MainCategories[index2].SubCategories[
                      index3
                    ].Criteria.push({
                      name: critera.name,
                      checked: false,
                      value: "3",
                      imported: true
                    });
                  }
                }
              });
            }
          );
        });
      });
      this.setState({ developmentForm: developmentFormState });
    }
  }

  handleChange = (event: any) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as State);
  };

  addCompetence = () => {
    const developmentForm = this.state.developmentForm;
    developmentForm.push({
      name: "Kompetenzkategorie",
      checked: false,
      open: true,
      MainCategories: [],
      imported: false
    });
    this.setState({ developmentForm });
  };

  addMainCategory = index => {
    const developmentForm = this.state.developmentForm;
    developmentForm[index].MainCategories.push({
      name: "Hauptkategorie",
      checked: false,
      SubCategories: [],
      open: true,
      imported: false
    });
    this.setState({ developmentForm });
  };

  addSubCategory = (index, index2) => {
    const developmentForm = this.state.developmentForm;
    developmentForm[index].MainCategories[index2].SubCategories.push({
      name: "Unterkategorie",
      checked: false,
      open: true,
      Criteria: [],
      imported: false
    });
    this.setState({ developmentForm });
  };

  addCriteria = (index, index2, index3) => {
    const developmentForm = this.state.developmentForm;
    developmentForm[index].MainCategories[index2].SubCategories[index3].Criteria.push({
      name: "Kriterium",
      checked: false,
      value: "3",
      imported: false
    });
    this.setState({ developmentForm });
  };

  getStepContent = stepIndex => {
    const { loading } = this.props;
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
        return loading ? (
          <CircularProgress />
        ) : (
          <CompetenceCreation
            developmentForm={this.state.developmentForm}
            onClickAddButton={this.addCompetence}
            classes={this.props.classes}
            name={"developmentForm"}
          />
        );
      case 2:
        return loading ? (
          <CircularProgress />
        ) : (
          <MainCategoryCreation
            classes={this.props.classes}
            onClickAddButton={this.addMainCategory}
            developmentForm={this.state.developmentForm}
            name={"developmentForm"}
          />
        );
      case 3:
        return loading ? (
          <CircularProgress />
        ) : (
          <SubCategoryCreation
            classes={this.props.classes}
            onClickAddButton={this.addSubCategory}
            developmentForm={this.state.developmentForm}
            name={"developmentForm"}
          />
        );
      case 4:
        return loading ? (
          <CircularProgress />
        ) : (
          <CriteriaCreation
            classes={this.props.classes}
            onClickAddButton={this.addCriteria}
            developmentForm={this.state.developmentForm}
            name={"developmentForm"}
          />
        );
      default:
        return "Ups, hier lief etwas schief!";
    }
  };

  handleNext = () => {
    const { activeStep, developmentForm } = this.state;
    const {
      getAllCompetences,
      getAllMainCategories,
      getAllSubCategories,
      getAllCriteria
    } = this.props;
    if (activeStep === 0) {
      getAllCompetences();
    }

    if (activeStep === 1) {
      developmentForm.map((competence, index) => {
        getAllMainCategories(competence.name);
      });
    }

    if (activeStep === 2) {
      developmentForm.map((competence, index) => {
        developmentForm[index].MainCategories.map((mainCategory, index) => {
          getAllSubCategories(mainCategory.name);
        });
      });
    }

    if (activeStep === 3) {
      developmentForm.map((competence, index) => {
        developmentForm[index].MainCategories.map((mainCategory, index2) => {
          developmentForm[index].MainCategories[index2].SubCategories.map((subCategory, index3) => {
            getAllCriteria(subCategory.name);
          });
        });
      });
    }

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
                <Button onClick={this.handleReset}>Abschließen</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions} />
                {this.getStepContent(activeStep)}
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

const connectedDevelopmentStepper = withStyles(styles)(
  connect<ReduxStateProps, ReduxDispatchProps, Props>(
    mapStateToProps,
    mapDispatchToProps
  )(DevelopmentStepper)
);

export { connectedDevelopmentStepper as DevelopmentStepper };
