import * as React from "react";
import "./App.css";
import { connect } from "react-redux";
import { history } from "./helpers";
import { clearAlert } from "./redux/actions";
import { SnackbarContent } from "@material-ui/core";
import { Route } from "react-router";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/HomeComponent";
import { PrivateRoute } from "./components/PrivateRoute";

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
        {alert.message && (
          <SnackbarContent
            className={`alert ${alert.type}`}
            message={alert.message}
          />
        )}
        <Route path={"/login"} exact={true} component={Login} />

        {history.location.pathname !== "/login" && (
          <PrivateRoute path={"/"} component={Home} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { alertReducer } = state;
  return {
    alert: alertReducer
  };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
