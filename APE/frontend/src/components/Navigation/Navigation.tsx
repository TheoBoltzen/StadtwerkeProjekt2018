import { connect } from "react-redux";
import { NavigationComponent } from "./NavigationComponent";

export interface State {
  redirect: boolean;
}

interface Props {}

interface ReduxStateProps {
  user: any;
}

export type AllProps = Props & ReduxStateProps;

const mapStateToProps = (state: any) => {
  const { user } = state.authenticationReducer;
  return {
    user: user.token ? user : JSON.parse(user)
  };
};

const connectedNavigation = connect(mapStateToProps)(NavigationComponent);
export { connectedNavigation as Navigation };
