import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Home from "./../pages/Home";
import Header from "./../components/layout/Header";
import EmptyState from "./../components/global/EmptyState";

import routes, { IRouteType } from "./routes";

import auth from "../helpers/auth-helper";

import Loading from "../components/global/Loading";
import Login from "../pages/Login";

// import ReactGA from "react-ga";
// import { config } from "../../config/config";

/**
 * Handles Routing for the application
 *
 * @returns {JSX.Element}
 */
const MainRouter = () => {
  // const [hasAccessToken, setHasAccessToken] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);

  const history = useHistory();

  /**
   * Initialize Google Analytics
   */
  //  ReactGA.initialize(config.ga_id);

  useEffect(() => {
    if (!isAuthed) {
      const setAuth = (bool: boolean) => setIsAuthed(bool);

      const jwt = auth.accessTokenExists();
      setAuth(jwt ? true : false);

      /**
       * Listen for changes in the URL bar,
       * and check if the user is authenticated
       *
       * Can only be done when the component
       * is exported through withRouter
       */
      history.listen(() => {
        const jwt = auth.accessTokenExists();
        setAuth(jwt ? true : false);

        // ReactGA.pageview(window.location.pathname + window.location.search);
      });

      return;
    }
  }, [history, isAuthed]);

  return (
    <React.Fragment>
      <Header isAuthed={isAuthed} setIsAuthed={setIsAuthed} history={history} />

      <Grid
        container
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={isAuthed ? Home : Login} />

              {routes.map(({ link, component, authed }: IRouteType, i) => {
                if (authed && !isAuthed)
                  return (
                    <Route
                      key={i}
                      render={() => (
                        <EmptyState
                          message="You need to be logged in to view this page"
                          action={() => history.push("/login")}
                          actionLabel={"Login"}
                        />
                      )}
                    />
                  );

                return <Route path={link} component={component} key={i} />;
              })}

              <Route
                render={() => (
                  <EmptyState message="The page you are looking for does not exist" />
                )}
              />
            </Switch>
          </Suspense>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainRouter;
