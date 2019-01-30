import * as React from "react";
import "./App.css";
import { connect } from "react-redux";
import { history } from "./helpers";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { Route } from "react-router";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/HomeComponent";
import { PrivateRoute } from "./components/PrivateRoute";
import { ApplicationState } from "./redux/reducers";
import { clearAlert, saveAlert } from "./redux/actions";
import InfoIcon from "@material-ui/icons/Info";

interface Props {
  dispatch: any;
  alert: any;
}

interface State {
  snackbarIsOpen: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { dispatch } = this.props;

    //History ist used to know where the User was before
    history.listen((location, action) => {
      dispatch(saveAlert());
    });

    this.state = {
      snackbarIsOpen: false
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    //Show notification if a new message appears
    if (nextProps.alert.message) {
      this.setState({ snackbarIsOpen: true });

      //Timeout is used to clear the message
      setTimeout(() => {
        this.props.dispatch(clearAlert());
      }, 6000);
    }
  }

  private handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarIsOpen: false });
  };

  public render() {
    const { alert } = this.props;
    const { snackbarIsOpen } = this.state;

    const message = (
      <span className={"alert-message"}>
        <InfoIcon className={"alert-icon"} />
        {alert.message}
      </span>
    );

    return (
      <div className="App">
        <Snackbar
          className={"snackbar"}
          open={snackbarIsOpen}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackbar}>
          <SnackbarContent className={`alert ${alert.type}`} message={message} />
        </Snackbar>

        <Route path={"/login"} exact={true} component={Login} />

        {history.location.pathname !== "/login" && <PrivateRoute path={"/"} component={Home} />}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  const { alertReducer } = state;
  return {
    alert: alertReducer
  };
};

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
