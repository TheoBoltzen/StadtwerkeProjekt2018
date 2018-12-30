import { Trainee } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAllTrainees } from "../../redux/actions";
import { connect } from "react-redux";
import { TraineesComponent } from "./TraineesComponent";

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly trainees: Trainee[];
}

interface ReduxDispatchProps {
  readonly getAllTrainees: () => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, trainees } = state.traineeTabReducer;
  return {
    loading,
    trainees
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllTrainees: () => dispatch(getAllTrainees())
  };
};

const connectedTrainees = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineesComponent);

export { connectedTrainees as Trainees };
