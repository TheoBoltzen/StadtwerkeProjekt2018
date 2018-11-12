import * as React from "react";
import "./App.css";

import logo from "./resources/swk.svg";
import { connect } from "react-redux";
import { history } from "./helpers";
import { clearAlert } from "./redux/actions";
import { Route, Router } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { MemberTest } from "./MemberTest";
import { Login } from "./LoginComponent";

export interface Items {
  id: number;
  name: string;
  description: string;
  qty: number;
}

interface Props {
  dispatch: any;
  alert: any;
}

interface State {
  items: Items[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(clearAlert());
    });

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.getMembers();
  }

  private getMembers() {
    fetch("/api/items")
      .then(res => res.json())
      .then(res =>
        this.setState({ items: res }, () => console.log("fetched", res))
      );
  }

  public render() {
    const { alert } = this.props;

    return (
      <div className="App">
        {alert && alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Router history={history}>
          <div>
            <PrivateRoute exact={true} path={"/"} component={MemberTest} />
            <Route path={"/login"} component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { alert } = state;
  return {
    alert
  };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
