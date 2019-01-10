import { FillDevelopmentSheetComponent } from "./FillOutDevelopmentSheetComponent";
import { FullDevSheetFetch, TraineesAssessments } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { setTraineeAssessments, setTraineeStatusEstimated } from "../../redux/actions"; //setTrainerAssessments
import { connect } from "react-redux";

export interface State {
  radioValue: { name: string; value: string; id: number }[];
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
  readonly setTraineeAssessment: (traineeAssessments: TraineesAssessments[]) => void;
  readonly setTraineeEstimation: (devSheetID: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loadingStatusEstimated, loading } = state.traineeAssessmentReducer;
  return {
    loadingSave: loading,
    loadingStatus: loadingStatusEstimated
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    setTraineeAssessment: traineeAssessments => dispatch(setTraineeAssessments(traineeAssessments)),
    setTraineeEstimation: devSheetID => dispatch(setTraineeStatusEstimated(devSheetID))
  };
};

const connectedFillOutDevelopmentSheet = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(FillDevelopmentSheetComponent);

export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheet };
