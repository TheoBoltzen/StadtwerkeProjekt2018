import { TraineeViewComponent } from "./TraineeViewComponent";
import { DevelopmentForm } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";

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
    getAllDevForms: () => dispatch(getAll())
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
