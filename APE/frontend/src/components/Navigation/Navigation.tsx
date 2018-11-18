import { connect } from "react-redux";
import { NavigationComponent } from "./NavigationComponent";
import { RouteComponentProps, withRouter } from "react-router";
import { User } from "../../types";

export interface State {
  redirect: boolean;
}

interface Props {}

interface ReduxStateProps {
  user: User;
}

export type AllProps = Props & ReduxStateProps & RouteComponentProps;

const mapStateToProps = (state): ReduxStateProps => {
  const { user } = state.authenticationReducer;
  return {
    user: user.token ? user : JSON.parse(user)
  };
};

const connectedNavigation = withRouter(
  connect<ReduxStateProps, {}, RouteComponentProps>(mapStateToProps)(NavigationComponent)
);
export { connectedNavigation as Navigation };
