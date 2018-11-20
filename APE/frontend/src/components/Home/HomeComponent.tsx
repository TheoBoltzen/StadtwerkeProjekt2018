import * as React from "react";
import IdleTimer from "react-idle-timer";
import { Redirect } from "react-router";
import { Navigation } from "../Navigation/Navigation";
import { UserAdministration } from "../UserAdministration/UserAdministration";
import { PrivateRoute } from "../PrivateRoute";
import { DevelopmentForms } from "../DevelopmentForms/DevelopmentForms";
import { Trainees } from "../Trainees/Trainees";
import { RouterPathsConstants } from "../../constants";

interface Props {}

interface State {
  redirect: boolean;
}

export class Home extends React.Component<Props, State> {
  public idleTimer: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: false
    };

    this.idleTimer = null;
  }
  render() {
    const { redirect } = this.state;

    return (
      <IdleTimer
        ref={ref => {
          this.idleTimer = ref;
        }}
        element={document}
        onIdle={this._onIdle}
        timeout={15 * 60 * 100}>
        {redirect && <Redirect to={"/login"} />}

        <Navigation />

        <PrivateRoute
          path={RouterPathsConstants.userAdministration}
          exact={true}
          component={UserAdministration}
        />
        <PrivateRoute
          path={RouterPathsConstants.developmentForms}
          exact={true}
          component={DevelopmentForms}
        />
        <PrivateRoute path={RouterPathsConstants.trainees} exact={true} component={Trainees} />
      </IdleTimer>
    );
  }

  private _onIdle = () => {
    this.setState({ redirect: true });
  };
}
