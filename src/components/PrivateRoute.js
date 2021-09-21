import React from 'react';
import {Route, Redirect } from "react-router-dom";
import {isLoggedInAdmin, isLoggedInRegular} from './Auth.js';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        isLoggedInAdmin() || isLoggedInRegular() ? (
        <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );