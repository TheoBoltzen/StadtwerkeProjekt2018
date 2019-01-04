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
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (devSheetID: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms } = state.developmentFormsReducer;
  return {
    loading,
    developmentForms
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    setAssignment: devSheetID => dispatch(setTraineeDevelopmentSheet(devSheetID))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
