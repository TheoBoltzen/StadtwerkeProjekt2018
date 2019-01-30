import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { UserAdministrationComponent } from "./UserAdministrationComponent";
import { User } from "../../types";
import { getAll } from "../../redux/actions";

/** Interface and type declaration **/
export interface State {
  readonly isAddUserModalOpen: boolean;
}

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly users: User[];
}

interface ReduxDispatchProps {
  readonly getAllUsers: () => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

/** Connecting Redux **/
const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, users } = state.userReducer;
  return {
    loading,
    users
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getAllUsers: () => dispatch(getAll())
  };
};

const connectedUserAdministration = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(UserAdministrationComponent);

/** Export component **/
export { connectedUserAdministration as UserAdministration };
