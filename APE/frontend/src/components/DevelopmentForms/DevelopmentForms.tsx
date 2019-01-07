import { DevelopmentFormsComponent } from "./DevelopmenFormsComponent";
import { DevelopmentForm, EmptyDevSheetFetch } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll, getDetailDevelopmentSheet } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";

export interface State {
  visibilityIndex: number;
  developmenFormId: string;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly loadingDetail: boolean;
  readonly developmentForms: DevelopmentForm[];
  readonly detailDevForm: EmptyDevSheetFetch;
}

interface ReduxDispatchProps {
  readonly getAllDevForms: () => void;
  readonly getDevSheetDetails: (id) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, developmentForms } = state.developmentFormsReducer;
  const { developmentFormDetail } = state.developmentFormsReducer;
  const loadingDetail = state.developmentFormsReducer.loading;

  return {
    loading,
    loadingDetail,
    developmentForms,
    detailDevForm: developmentFormDetail
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllDevForms: () => dispatch(getAll()),
    getDevSheetDetails: id => dispatch(getDetailDevelopmentSheet(id))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(DevelopmentFormsComponent);

export { connectedDevelopmentForm as DevelopmentForms };
