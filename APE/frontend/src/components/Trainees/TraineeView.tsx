import { TraineeViewComponent } from "./TraineeViewComponent";
import { DevelopmentForm } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import { setTraineeDevelopmentSheet } from "../../redux/actions";

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
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (username: string, devSheetID: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms } = state.developmentFormsReducer;
  const { user } = state.authenticationReducer;
  return {
    loading,
    user: (user as any).token ? user : JSON.parse(user as any),
    developmentForms
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    setAssignment: (username, devSheetID) =>
      dispatch(setTraineeDevelopmentSheet(username, devSheetID))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
