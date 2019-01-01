import { ApplicationState } from "../../redux/reducers";
import { createUser } from "../../redux/actions";
import { connect } from "react-redux";
import { AddUserModalComponent } from "./AddUserModalComponent";

interface Props {
  readonly closeDialog: () => void;
}

interface ReduxStateProps {
  readonly loading: boolean;
}

interface ReduxDispatchProps {
  readonly createUser: (
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string
  ) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loading } = state.registerUserReducer;
  return {
    loading
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    createUser: (username, password, firstname, lastname, role) =>
      dispatch(createUser(username, password, firstname, lastname, role))
  };
};

const connectedAddUserModal = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(AddUserModalComponent);

export { connectedAddUserModal as AddUserModal };
