import { TraineeViewComponent } from "./TraineeViewComponent";
import { DevelopmentForm, DevelopmentFormsListTrainee, EmptyDevSheetFetch } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll, getDetailDevelopmentSheet } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import { setTraineeDevelopmentSheet, getTraineeDevelopmentSheetList } from "../../redux/actions";
//import { getTraineeDevelopmentSheetList } from "../../redux/actions";

export interface State {
  visibility_index: string;
  developmenFormId: string;
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
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly setAssignment: (devSheetID: string) => void;
  readonly getDevFormsListTrainee: () => void;
  readonly getDevSheetDetails: (id) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms, developmentFormDetail } = state.developmentFormsReducer;
  const { traineeDevelopmentFormsList } = state.traineeDevelopmentFormsListReducer; //loading fehlt
  const loadingTraineeDevSheets = state.traineeDevelopmentFormsReducer.loading;
  const loadingDetail = state.developmentFormsReducer.loading;

  const { user } = state.authenticationReducer;
  return {
    loading,
    loadingDetail,
    loadingTraineeDevSheets,
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
    getDevSheetDetails: id => dispatch(getDetailDevelopmentSheet(id))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(TraineeViewComponent);

export { connectedDevelopmentForm as TraineeView };
