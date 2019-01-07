import { TraineeViewComponent } from "./TraineeViewComponent";
import { DevelopmentForm, DevelopmentFormsListTrainee, EmptyDevSheetFetch } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import {
  setTraineeDevelopmentSheet,
  getTraineeDevelopmentSheetList,
  getFullDevSheetAsTrainee
} from "../../redux/actions";
//import { getTraineeDevelopmentSheetList } from "../../redux/actions";

export interface State {
  visibility_index: string;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly loadingTraineeDevSheets: boolean;
  readonly developmentForms: DevelopmentForm[];
  readonly user: any;
  readonly traineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
  readonly fullDevSheet: EmptyDevSheetFetch;
  readonly loadingFullDevSheet: boolean;
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (devSheetID: string) => void;
  readonly getDevFormsListTrainee: (TraineeUsername: string) => void;
  readonly getFullDevSheet: (devSheetId: number, trainerUsername: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms } = state.developmentFormsReducer;
  const { traineeDevelopmentFormsList } = state.traineeDevelopmentFormsListReducer; //loading fehlt
  const loadingTraineeDevSheets = state.traineeDevelopmentFormsReducer.loading;
  const { devSheet } = state.traineeDevelopmentFormsReducer;
  const loadingFullDevSheet = state.traineeDevelopmentFormsReducer.loading;

  const { user } = state.authenticationReducer;
  return {
    loading,
    loadingTraineeDevSheets,
    loadingFullDevSheet,
    fullDevSheet: devSheet,
    user: (user as any).token ? user : JSON.parse(user as any),
    developmentForms,
    traineeDevelopmentFormsList
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    getDevFormsListTrainee: TraineeUsername =>
      dispatch(getTraineeDevelopmentSheetList(TraineeUsername)),
    setAssignment: devSheetID => dispatch(setTraineeDevelopmentSheet(devSheetID)),
    getFullDevSheet: (devSheetId, trainerUsername) =>
      dispatch(getFullDevSheetAsTrainee(devSheetId, trainerUsername))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
