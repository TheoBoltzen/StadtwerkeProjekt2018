import { DevelopmentFormsComponent } from "./DevelopmenFormsComponent";
import { DevelopmentForm, EmptyDevSheetFetch } from "../../types";
import { ApplicationState } from "../../redux/reducers";
import { getAll, getDetailDevelopmentSheet } from "../../redux/actions/development-forms-actions";
import { connect } from "react-redux";
import { getRole } from "../../redux/actions";

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
  role: string;
}

interface ReduxDispatchProps {
  getRole: (token: string) => void;
  readonly getAllDevForms: () => void;
  readonly getDevSheetDetails: (id) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { role } = state.userReducer;

  const { loading, developmentForms } = state.developmentFormsReducer;
  const { developmentFormDetail } = state.developmentFormsReducer;
  const loadingDetail = state.developmentFormsReducer.loading;

  return {
    loading,
    loadingDetail,
    developmentForms,
    detailDevForm: developmentFormDetail,
    role
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getRole: token => dispatch(getRole(token)),
    getAllDevForms: () => dispatch(getAll()),
    getDevSheetDetails: id => dispatch(getDetailDevelopmentSheet(id))
  };
};

const connectedDevelopmentForm = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(DevelopmentFormsComponent);

export { connectedDevelopmentForm as DevelopmentForms };
