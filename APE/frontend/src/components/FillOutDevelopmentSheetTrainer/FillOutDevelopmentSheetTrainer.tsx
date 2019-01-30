import { FullDevSheetFetch, TrainerAssessments } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { FillOutDevelopmentSheetTrainerComponent } from "./FillOutDevelopmentSheetTrainerComponent";
import { setTrainerAssessments, setTrainerStatusRated } from "../../redux/actions";
import { WithStyles } from "@material-ui/core";
import { styles } from "./FillOutDevelopmentSheetTrainerComponent";
import withStyles from "@material-ui/core/styles/withStyles";

/** Interface and type declaration **/
export interface State {
  radioValue: { name: string; value: string; id: number }[];
  open: boolean;
}

interface Props extends WithStyles<typeof styles> {
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

/** Connecting Redux **/
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

const connectedFillOutDevelopmentSheet = withStyles(styles)(
  connect<ReduxStateProps, ReduxDispatchProps, Props>(
    mapStateToProps,
    mapDispatchToProps
  )(FillOutDevelopmentSheetTrainerComponent)
);

/** Export component **/
export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheetTrainer };
