import { connect } from "react-redux";
import { NavigationComponent } from "./NavigationComponent";
import { RouteComponentProps, withRouter } from "react-router";
import { User } from "../../types";
import { getRole, successAlert } from "../../redux/actions";

/** Interface and type declaration **/
export interface State {
  redirect: boolean;
}

interface Props {}

interface ReduxStateProps {
  role: string;
  user: User;
}

interface ReduxDispatchProps {
  getRole: (token: string) => void;
  successAlert: (msg: string) => void;
}

export type AllProps = Props & ReduxStateProps & ReduxDispatchProps & RouteComponentProps;

/** Connecting Redux **/
const mapDispatchToProps = (dispatch): ReduxDispatchProps => {
  return {
    getRole: token => dispatch(getRole(token)),
    successAlert: msg => dispatch(successAlert(msg))
  };
};

const mapStateToProps = (state): ReduxStateProps => {
  const { role } = state.userReducer;
  const { user } = state.authenticationReducer;
  return {
    user: user.token ? user : JSON.parse(user),
    role
  };
};

const connectedNavigation = withRouter(
  connect<ReduxStateProps, ReduxDispatchProps, RouteComponentProps>(
    mapStateToProps,
    mapDispatchToProps
  )(NavigationComponent)
);

/** Export component **/
export { connectedNavigation as Navigation };
