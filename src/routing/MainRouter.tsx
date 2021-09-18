import React, { Suspense, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Home from "./../pages/Home";
import Header from "./../components/layout/Header";
import EmptyState from "./../components/global/EmptyState";

import routes, { IRouteType } from "./routes";

// import auth from "./helpers/auth-helper";
import auth from "../helpers/auth-helper";
import { generateAccessToken } from "../api/api-auth";

import Loading from "../components/global/Loading";

/**
 * Handles Routing for the application
 *
 * @returns {JSX.Element}
 */
const MainRouter = () => {
  const [hasAccessToken, setHasAccessToken] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const history = useHistory();

  useEffect(() => {
    if (!hasAccessToken) {
      const tokenObj = auth.accessTokenExists();
      if (tokenObj) {
        setLoading(false);
        setHasAccessToken(true);
      } else {
        generateAccessToken().then(
          (res: {
            status?: any;
            message?: any;
            accessToken?: any;
            accessTokenExpiresAt?: any;
          }) => {
            console.log("yes", res);
            if (res.status) {
              setError(res.message || "Could not connect to server");
              setLoading(false);
              return;
            }
            const { accessToken, accessTokenExpiresAt } = res;
            auth.setAccessToken({ accessToken, accessTokenExpiresAt }, () => {
              setLoading(false);
            });
          }
        );
      }
    }
  }, [hasAccessToken]);

  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} />;

  return (
    <React.Fragment>
      <Header />
      <Grid
        container
        justify="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Grid item xs={11}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />

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
