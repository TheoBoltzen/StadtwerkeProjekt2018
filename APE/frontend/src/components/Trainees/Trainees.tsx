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

/** Interface and type declaration **/
export interface State {
  readonly visibilityIndex: string;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly trainees: Trainee[];
  readonly connectedDevSheets: ConnectedDevSheetFetch[];
  readonly loadingFullDevSheet: boolean;
  readonly fullDevSheet: FullDevSheetFetch;
}

interface ReduxDispatchProps {
  readonly getFullDevSheet: (
    devSheetID: number,
    traineeUsername: string,
    trainerUsername: string
  ) => void;
  readonly getAllTrainees: () => void;
  readonly getAllConnectedDevSheets: () => void;
  readonly setDevSheetToTrainer: (traineeUsername: string, devSheetId: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

/** Connecting Redux **/
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
    getFullDevSheet: (devSheetID, traineeUsername, trainerUsername) =>
      dispatch(getFullDevSheetAsTrainer(devSheetID, traineeUsername, trainerUsername)),
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

/** Export component **/
export { connectedTrainees as Trainees };
