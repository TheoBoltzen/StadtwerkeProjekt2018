import { TraineeViewComponent } from "./TraineeViewComponent";
import {
  DevelopmentForm,
  DevelopmentFormsListTrainee,
  EmptyDevSheetFetch,
  FullDevSheetFetch
} from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll, getDetailDevelopmentSheet } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import {
  setTraineeDevelopmentSheet,
  getTraineeDevelopmentSheetList,
  getFullDevSheetAsTrainee
} from "../../redux/actions";

/** Interface and type declaration **/
export interface State {
  visibility_index: string;
  developmentFormId: string;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly loadingTraineeDevSheets: boolean;
  readonly loadingDetail: boolean;
  readonly developmentForms: DevelopmentForm[];
  readonly detailDevForm: EmptyDevSheetFetch;
  readonly user: any;
  readonly traineeDevelopmentFormsList: DevelopmentFormsListTrainee[];
  readonly fullDevSheet: FullDevSheetFetch;
  readonly loadingFullDevSheet: boolean;
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (devSheetID: string) => void;
  readonly getDevFormsListTrainee: () => void;
  readonly getFullDevSheet: (devSheetId: number, trainerUsername: string) => void;
  readonly getDevSheetDetails: (id) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

/** Connecting Redux **/
const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms, developmentFormDetail } = state.developmentFormsReducer;
  const { traineeDevelopmentFormsList } = state.traineeDevelopmentFormsListReducer; //loading fehlt
  const loadingTraineeDevSheets = state.traineeDevelopmentFormsReducer.loading;
  const { devSheet } = state.traineeDevelopmentFormsReducer;
  const loadingFullDevSheet = state.traineeDevelopmentFormsReducer.loading;
  const loadingDetail = state.developmentFormsReducer.loading;

  const { user } = state.authenticationReducer;
  return {
    loading,
    loadingDetail,
    loadingTraineeDevSheets,
    loadingFullDevSheet,
    fullDevSheet: devSheet,
    user: (user as any).token ? user : JSON.parse(user as any),
    developmentForms,
    traineeDevelopmentFormsList,
    detailDevForm: developmentFormDetail
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    getDevFormsListTrainee: () => dispatch(getTraineeDevelopmentSheetList()),
    setAssignment: devSheetID => dispatch(setTraineeDevelopmentSheet(devSheetID)),
    getFullDevSheet: (devSheetId, trainerUsername) =>
      dispatch(getFullDevSheetAsTrainee(devSheetId, trainerUsername)),
    getDevSheetDetails: id => dispatch(getDetailDevelopmentSheet(id))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

/** Export component **/
export { connectedDevelopmentForm as TraineeView };
