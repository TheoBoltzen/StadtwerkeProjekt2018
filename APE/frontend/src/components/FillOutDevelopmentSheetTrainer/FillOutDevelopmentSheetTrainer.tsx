import { FullDevSheetFetch, TrainerAssessments } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { FillOutDevelopmentSheetTrainerComponent } from "./FillOutDevelopmentSheetTrainerComponent";
import { setTrainerAssessments, setTrainerStatusRated } from "../../redux/actions";

export interface State {
  radioValue: { name: string; value: string; id: number }[];
  open: boolean;
}

interface Props {
  readonly loading: boolean;
  readonly fullDevSheet: FullDevSheetFetch;
  readonly goBack: () => void;
}

interface ReduxStateProps {
  readonly loadingSave: boolean;
  readonly loadingStatus: boolean;
}

interface ReduxDispatchProps {
  readonly setTrainerAssessment: (traineeAssessments: TrainerAssessments[]) => void;
  readonly setTrainerEstimation: (devSheetID: string, traineeUsername: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loadingStatusEstimated, loading } = state.trainerAssessmentReducer;
  return {
    loadingSave: loading,
    loadingStatus: loadingStatusEstimated
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    setTrainerAssessment: traineeAssessments => dispatch(setTrainerAssessments(traineeAssessments)),
    setTrainerEstimation: (devSheetID, traineeUsername) =>
      dispatch(setTrainerStatusRated(devSheetID, traineeUsername))
  };
};

const connectedFillOutDevelopmentSheet = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(FillOutDevelopmentSheetTrainerComponent);

export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheetTrainer };
