import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config

import adminRoutes from "src/routes/adminRoutes";
import teacherRoutes from "src/routes/teacherRoutes";
import studentRoutes from "src/routes/studentRoute";
import { connect } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = ({ role }) => {
  const [routes, setroutes] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setroutes(adminRoutes);
    } else if (role === "teacher") {
      setroutes(teacherRoutes);
    } else if (role === "student") {
      setroutes(studentRoutes);
    } else {
      setroutes([]);
    }
  }, [role]);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
});

export default connect(mapStateToProps)(React.memo(TheContent));
