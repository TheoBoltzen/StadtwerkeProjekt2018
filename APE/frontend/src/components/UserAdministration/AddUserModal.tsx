import { ApplicationState } from "../../redux/reducers";
import { createUser } from "../../redux/actions";
import { connect } from "react-redux";
import { AddUserModalComponent } from "./AddUserModalComponent";
import { WithStyles } from "@material-ui/core";
import { styles } from "../UserAdministration/AddUserModalComponent";
import withStyles from "@material-ui/core/styles/withStyles";

export interface State {
  readonly username: string;
  readonly role: string;
  readonly password: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly hiredOn: string;
  readonly profession: string;
}

interface Props extends WithStyles<typeof styles> {
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
    role: string,
    hiredOn: string,
    profession: string
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
    createUser: (username, password, firstname, lastname, role, hiredOn, profession) =>
      dispatch(createUser(username, password, firstname, lastname, role, hiredOn, profession))
  };
};

const connectedAddUserModal = withStyles(styles)(
  connect<ReduxStateProps, ReduxDispatchProps, Props>(
    mapStateToProps,
    mapDispatchToProps
  )(AddUserModalComponent)
);

export { connectedAddUserModal as AddUserModal };
