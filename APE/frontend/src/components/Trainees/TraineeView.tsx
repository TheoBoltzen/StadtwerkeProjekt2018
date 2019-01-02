import { TraineeViewComponent } from "./TraineeViewComponent";
import { DevelopmentForm, DevelopmentFormsListTrainee } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import { setTraineeDevelopmentSheet } from "../../redux/actions";
import { getTraineeDevelopmentSheetList } from "../../redux/actions/trainee-developmentforms-list-actions";

export interface State {
  visibilityIndex: boolean;
  isHidden: boolean;
  showFillOutDialog: boolean;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly developmentForms: DevelopmentForm[];
  readonly user: any;
  readonly taineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (username: string, devSheetID: string) => void;
  readonly getDevFormsListTrainee: (username: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms } = state.developmentFormsReducer;
  const { taineeDevelopmentFormsList } = state.traineeDevelopmentFormsListReducer; //loading fehlt
  const { user } = state.authenticationReducer;
  return {
    loading,
    user: (user as any).token ? user : JSON.parse(user as any),
    developmentForms,
    taineeDevelopmentFormsList
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    getDevFormsListTrainee: username => dispatch(getTraineeDevelopmentSheetList(username)),

    setAssignment: (username, devSheetID) =>
      dispatch(setTraineeDevelopmentSheet(username, devSheetID))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
