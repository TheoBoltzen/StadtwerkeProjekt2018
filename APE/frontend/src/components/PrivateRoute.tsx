import {Redirect, Route} from "react-router";
import * as React from "react";

export const PrivateRoute = ({component: Component, ...rest}: any) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') ? <Component {...props}/> : <Redirect to={{ pathname: '/login', state: {from: props.location }}}/>
    )}/>
);
