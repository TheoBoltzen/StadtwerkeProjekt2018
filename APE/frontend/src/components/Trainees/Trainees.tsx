import { ConnectedDevSheetFetch, Trainee } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAllConnectedDevSheets, getAllTrainees } from "../../redux/actions";
import { connect } from "react-redux";
import { TraineesComponent } from "./TraineesComponent";

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly trainees: Trainee[];
  readonly connectedDevSheets: ConnectedDevSheetFetch[];
}

interface ReduxDispatchProps {
  readonly getAllTrainees: () => void;
  readonly getAllConnectedDevSheets: () => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, trainees, connectedDevSheets } = state.traineeTabReducer;
  return {
    loading,
    trainees,
    connectedDevSheets
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllTrainees: () => dispatch(getAllTrainees()),
    getAllConnectedDevSheets: () => dispatch(getAllConnectedDevSheets())
  };
};

const connectedTrainees = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineesComponent);

export { connectedTrainees as Trainees };
