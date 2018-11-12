import { login, logout } from "./redux/actions";
import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";

interface Props {}

interface ReduxStateProps {
  loggingIn: boolean;
}

interface ReduxDispatchProps {
  logout: () => void;
  login: (email: string, password: string) => void;
}

export interface State {
  email: string;
  passwort: string;
  submitted: boolean;
}
export type AllProps = Props & ReduxStateProps & ReduxDispatchProps;

const mapStateToProps = (state: any) => {
  const { loggingIn } = state.authenticationReducer;
  return {
    loggingIn
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
    login: (email, password) => dispatch(login(email, password))
  };
};

const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export { connectedLogin as Login };
