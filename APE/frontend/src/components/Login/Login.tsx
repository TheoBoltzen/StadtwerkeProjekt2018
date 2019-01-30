import { login, logout } from "../../redux/actions";
import { connect } from "react-redux";
import { LoginComponent } from "./LoginComponent";
import { ApplicationState } from "../../redux/reducers";

/** Interface and type declaration **/
interface Props {}

interface ReduxStateProps {
  loggingIn?: boolean;
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

/** Connecting Redux **/
const mapStateToProps = (state: ApplicationState): ReduxStateProps => {
  const { loggingIn } = state.authenticationReducer;
  return {
    loggingIn
  };
};

const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    logout: () => dispatch(logout()),
    login: (email, password) => dispatch(login(email, password))
  };
};

const connectedLogin = connect<ReduxStateProps, ReduxDispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

/** Export component **/
export { connectedLogin as Login };
