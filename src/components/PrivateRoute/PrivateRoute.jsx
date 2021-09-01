import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner.component';

const PrivateRoute = ({ auth: { isAuthenticated, loading}, component: Component, ...rest }) => {

  return loading ? (
    <Spinner width='50px' height='50px' />
  ) : (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
)};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
