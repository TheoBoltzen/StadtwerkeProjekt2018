import { FillDevelopmentSheetComponent } from "./FillOutDevelopmentSheetComponent";
import { FullDevSheetFetch, TraineesAssessments } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { setTraineeAssessments } from "../../redux/actions"; //setTrainerAssessments
import { connect } from "react-redux";

export interface State {
  radioValue: { name: string; value: string; id: number }[];
}

interface Props {
  readonly loading: boolean;
  readonly fullDevSheet: FullDevSheetFetch;
}

interface ReduxStateProps {}

interface ReduxDispatchProps {
  readonly setTraineeAssessment: (traineeAssessments: TraineesAssessments[]) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  return {};
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    setTraineeAssessment: traineeAssessments => dispatch(setTraineeAssessments(traineeAssessments))
  };
};

const connectedFillOutDevelopmentSheet = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(FillDevelopmentSheetComponent);

export { connectedFillOutDevelopmentSheet as FillOutDevelopmentSheet };
