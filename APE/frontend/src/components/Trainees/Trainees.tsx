import { ConnectedDevSheetFetch, FullDevSheetFetch, Trainee } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import {
  getAllConnectedDevSheets,
  getAllTrainees,
  getFullDevSheetAsTrainer,
  setTrainerToTraineeDevelopmentSheet
} from "../../redux/actions";
import { connect } from "react-redux";
import { TraineesComponent } from "./TraineesComponent";

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly trainees: Trainee[];
  readonly connectedDevSheets: ConnectedDevSheetFetch[];
  readonly loadingFullDevSheet: boolean;
  readonly fullDevSheet: FullDevSheetFetch;
}

interface ReduxDispatchProps {
  readonly getFullDevSheet: (devSheetID: number, traineeUsername: string) => void;
  readonly getAllTrainees: () => void;
  readonly getAllConnectedDevSheets: () => void;
  readonly setDevSheetToTrainer: (traineeUsername: string, devSheetId: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const {
    loading,
    trainees,
    connectedDevSheets,
    devSheet,
    loadingFullDevSheet
  } = state.traineeTabReducer;
  return {
    loading,
    trainees,
    connectedDevSheets,
    fullDevSheet: devSheet,
    loadingFullDevSheet
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getFullDevSheet: (devSheetID, traineeUsername) =>
      dispatch(getFullDevSheetAsTrainer(devSheetID, traineeUsername)),
    getAllTrainees: () => dispatch(getAllTrainees()),
    getAllConnectedDevSheets: () => dispatch(getAllConnectedDevSheets()),
    setDevSheetToTrainer: (traineeUsername, devSheetID) =>
      dispatch(setTrainerToTraineeDevelopmentSheet(traineeUsername, devSheetID))
  };
};

const connectedTrainees = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineesComponent);

export { connectedTrainees as Trainees };
