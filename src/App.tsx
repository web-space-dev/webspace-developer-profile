import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import MainRouter from "./routing/MainRouter";
import theme from "./theme";
import auth from "./helpers/auth-helper";
import { generateAccessToken } from "./api/api-auth";
import Loading from "./components/global/Loading";
import EmptyState from "./components/global/EmptyState";

/**
 * Entry point for the application
 *
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <MainRouter />
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
