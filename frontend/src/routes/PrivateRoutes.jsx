import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutes;
