import { WithStyles, withStyles } from "@material-ui/core";
import { styles } from "./mUIstyles";
import { connect } from "react-redux";
import { Competence } from "./Steps/CompetenceCreation";
import {
  CompetenceFetch,
  CriteriaFetch,
  DevelopmentFormCreate,
  MainCategoryFetch,
  SubCategoryFetch
} from "../../types";
import { ApplicationState } from "../../redux/reducers";
import {
  createDevelopmenSheet,
  getAllCompetences,
  getAllCriteria,
  getAllMainCategories,
  getAllSubCategories
} from "../../redux/actions/development-forms-actions";
import { DevelopmentStepperComponent } from "./DevelopmentStepperComponent";

export interface State {
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
  readonly createDevelopmentSheet: (developmentSheet: DevelopmentFormCreate) => void;
}

export interface Props extends WithStyles<typeof styles> {
  close: any;
  id?: number;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps & Props;

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
    getAllCriteria: (subCategoryName: string) => dispatch(getAllCriteria(subCategoryName)),
    createDevelopmentSheet: (developmentSheet: DevelopmentFormCreate) =>
      dispatch(createDevelopmenSheet(developmentSheet))
  };
};

const connectedDevelopmentStepper = withStyles(styles)(
  connect<ReduxStateProps, ReduxDispatchProps, Props>(
    mapStateToProps,
    mapDispatchToProps
  )(DevelopmentStepperComponent)
);

export { connectedDevelopmentStepper as DevelopmentStepper };
