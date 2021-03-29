import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import "./scss/style.scss";
import { ToastContainer } from "react-toastify";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/auth";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/common/pages/login/Login"));
const Register = React.lazy(() =>
  import("./views/common/pages/register/Register")
);
const Page404 = React.lazy(() =>
  import("./views/common/pages/page404/Page404")
);
const Page500 = React.lazy(() =>
  import("./views/common/pages/page500/Page500")
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser);
  }, []);

  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <PrivateRoutes
              path="/"
              name="Home"
              component={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
