import * as React from "react";
import { Stepper, Step, StepLabel, Typography, Button, CircularProgress } from "@material-ui/core";
import "./DevelopmentStepper.css";
import { getSteps } from "../../helpers";
import { DepartmentProfession } from "./Steps/department-profession";
import CompetenceCreation from "./Steps/CompetenceCreation";
import MainCategoryCreation from "./Steps/MainCategoryCreation";
import SubCategoryCreation from "./Steps/SubCategoryCreation";
import CriteriaCreation from "./Steps/CriteriaCreation";
import { DevelopmentFormCreate } from "../../types";
import { AllProps, State } from "./DevelopmentStepper";
import CustomizedButton from "../General/CustomizedButton";

export class DevelopmentStepperComponent extends React.Component<AllProps, State> {
  constructor(props: AllProps) {
    super(props);

    this.state = {
      activeStep: 0,
      department: "",
      profession: "",
      developmentForm: [],
      checkedMainCategory: false
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
          if (!competence.MainCategories.find(m => m.name === mainCategory.name)) {
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
        competence.MainCategories.map((mainCategory, index2) => {
          nextProps.subCategories.map(subCategory => {
            if (!mainCategory.SubCategories.find(s => s.name === subCategory.name)) {
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
        competence.MainCategories.map((mainCategory, index2) => {
          mainCategory.SubCategories.map((subCategory, index3) => {
            nextProps.criteria.map(critera => {
              if (!subCategory.Criteria.find(c => c.name === critera.name)) {
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
          });
        });
      });
      this.setState({ developmentForm: developmentFormState });
    }

    if (this.state.developmentForm.length && !nextProps.loading && this.state.activeStep === 5) {
      this.props.close();
    }
  }

  handleChange = (event: any) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value } as State);
  };

  handleToggleCompetences = (event: any, index) => {
    const { developmentForm } = this.state;
    if (developmentForm[index].checked) {
      developmentForm[index].checked = false;
    } else {
      developmentForm[index].checked = true;
    }
    this.forceUpdate();
  };

  handleToggleMainCategories = (event: any, index, index2) => {
    const { developmentForm } = this.state;
    if (developmentForm[index].MainCategories[index2].checked) {
      developmentForm[index].MainCategories[index2].checked = false;
    } else {
      developmentForm[index].MainCategories[index2].checked = true;
    }
    this.forceUpdate();
    this.setState({ checkedMainCategory: this.findCheckedMainCategory() });
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
        return loading ? (
          <CircularProgress />
        ) : (
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
            handleToggle={this.handleToggleCompetences}
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
            handleToggle={this.handleToggleMainCategories}
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
        return <CircularProgress />;
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
      developmentForm.map(competence => {
        getAllMainCategories(competence.name);
      });
    }

    if (activeStep === 2) {
      developmentForm.map(competence => {
        competence.MainCategories.map(mainCategory => {
          getAllSubCategories(mainCategory.name);
        });
      });
    }

    if (activeStep === 3) {
      developmentForm.map(competence => {
        competence.MainCategories.map(mainCategory => {
          mainCategory.SubCategories.map(subCategory => {
            getAllCriteria(subCategory.name);
          });
        });
      });
    }

    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));

    if (activeStep === 4) {
      const { createDevelopmentSheet } = this.props;
      const { department, developmentForm, profession } = this.state;

      const devSheet: DevelopmentFormCreate = {
        department: department,
        education: profession,
        content: developmentForm
          .filter(competence => competence.checked)
          .map(competence => ({
            name: competence.name,
            children: competence.MainCategories.filter(mainCategory => mainCategory.checked).map(
              mainCategory => ({
                name: mainCategory.name,
                children: mainCategory.SubCategories.filter(subCategory => subCategory.checked).map(
                  subCategory => ({
                    name: subCategory.name,
                    children: subCategory.Criteria.filter(criteria => criteria.checked).map(
                      criteria => ({
                        name: criteria.name,
                        goalCross: parseInt(criteria.value),
                        ynAnswer: false
                      })
                    )
                  })
                )
              })
            )
          }))
      };
      createDevelopmentSheet(devSheet);
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  findCheckedMainCategory = () => {
    let MainCategoryIsCheckedReturn = false;
    for (let i = 0, length = this.state.developmentForm.length; i < length; i++) {
      const mainCategoryIsChecked = this.state.developmentForm[i].MainCategories.find(
        m => m.checked
      );
      if (mainCategoryIsChecked) {
        MainCategoryIsCheckedReturn = true;
      }
    }
    return MainCategoryIsCheckedReturn;
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, profession, department, developmentForm } = this.state;

    const isFilled = !profession || !department;
    const competenceIsChecked = activeStep === 1 && !developmentForm.find(c => c.checked);
    const mainCategoryIsChecked = activeStep === 2 && !this.state.checkedMainCategory;
    return (
      <div className={"stepperRoot"}>
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
                <CustomizedButton
                  disabled={isFilled || competenceIsChecked || mainCategoryIsChecked}
                  onClick={this.handleNext}
                  text={activeStep === steps.length - 1 ? "Fertig" : "Weiter"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
