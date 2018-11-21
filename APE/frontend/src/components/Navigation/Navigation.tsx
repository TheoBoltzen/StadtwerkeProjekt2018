import { connect } from "react-redux";
import { NavigationComponent } from "./NavigationComponent";
import { RouteComponentProps, withRouter } from "react-router";

export interface State {
  redirect: boolean;
}

interface Props {}

interface ReduxStateProps {
  role: string;
}

export type AllProps = Props & ReduxStateProps & RouteComponentProps;

const mapStateToProps = (state): ReduxStateProps => {
  const { role } = state.userReducer;
  return {
    role: role
  };
};

const connectedNavigation = withRouter(
  connect<ReduxStateProps, {}, RouteComponentProps>(mapStateToProps)(NavigationComponent)
);
export { connectedNavigation as Navigation };
