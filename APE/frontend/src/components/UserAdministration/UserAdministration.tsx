import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { UserAdministrationComponent } from "./UserAdministrationComponent";
import { User } from "../../types";
import { getAll } from "../../redux/actions";

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

export { connectedUserAdministration as UserAdministration };
