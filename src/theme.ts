/**
 * File: theme.js
 * Project: ca2-client
 * Version 0.1.0
 * File Created: Tuesday, 5th January 2021 1:46:00 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Sunday, 7th February 2021 1:49:32 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2021 WebSpace, WebSpace
 */

import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#e01b84",
    },
    secondary: {
      main: "#410099",
    },
    background: {
      default: "#EDF2F7",
      paper: "#ffffff",
    },
    // type: "dark",
  },
  typography: {
    fontFamily: ["jaldi", "sans-serif"].join(","),

    h1: {
      fontWeight: 800,
      fontSize: "3.052rem",
      margin: "3rem 0 1.38rem",
      // color: "#4e4e4e",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.441rem",
      margin: "3rem 0 1.38rem",
      // color: "#4e4e4e",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.953rem",
      margin: "3rem 0 1.38rem",
      // color: "#4e4e4e",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.563rem",
      margin: "3rem 0 1.38rem",
      // color: "#4e4e4e",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.25rem",
      // color: "#4e4e4e",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
        margin: "16px auto",
      },
    },
    MuiListItemText: {
      root: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
    MuiCard: {
      root: {
        textAlign: "left",
      },
    },
    MuiCardActions: {
      root: {
        justifyContent: "center",
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
