import { ApplicationState } from "../../redux/reducers";
import { connect } from "react-redux";
import { UserAdministrationComponent } from "./UserAdministrationComponent";

interface Props {}

interface ReduxStateProps {
  readonly loading: boolean;
  readonly users: Users[];
}

interface ReduxDispatchProps {
  readonly getAllUsers: () => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading, users } = state.usersReducer;
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
