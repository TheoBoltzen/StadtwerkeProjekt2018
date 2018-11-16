import { connect } from "react-redux";
import { NavigationComponent } from "./NavigationComponent";
import { RouteComponentProps, withRouter } from "react-router";

export interface State {
  redirect: boolean;
}

interface Props {}

interface ReduxStateProps {
  user: any;
}

export type AllProps = Props & ReduxStateProps & RouteComponentProps;

const mapStateToProps = (state: any): ReduxStateProps => {
  const { user } = state.authenticationReducer;
  return {
    user: user.token ? user : JSON.parse(user)
  };
};

const connectedNavigation = withRouter(
  connect<ReduxStateProps, {}, RouteComponentProps>(mapStateToProps)(NavigationComponent)
);
export { connectedNavigation as Navigation };
