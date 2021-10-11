/**
 * Primary dependencies
 */
import React, { useEffect } from "react";

/**
 * Component Library imports
 */
import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import routes from "../../routing/routes";
import { AccountCircle } from "@material-ui/icons";
import { IHistoryProps } from "../../types";

import auth from "../../helpers/auth-helper";

/**
 * Component Types
 */
interface IProps {
  isAuthed: boolean;
  setIsAuthed: (bool: boolean) => void;
  history: IHistoryProps;
}

/**
 * Header for the application
 */
const Header = ({ history, isAuthed, setIsAuthed }: IProps) => {
  const [userId, setUserId] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (userId === "" && isAuthed) {
      const jwt = auth.accessTokenExists();
      if (jwt) setUserId(jwt._id);
    }
    /**
     * Listen for changes in the router and send page views to Google Analytics
     */
    // history.listen(() => {
    //   ReactGA.pageview(window.location.pathname + window.location.search);
    // });
  }, [history, isAuthed, userId]);

  /**
   * Logout from the application
   */
  const submit = () => {
    const jwt = auth.accessTokenExists();
    if (jwt) {
      setLoading(true);

      auth.unsetAccessToken((success: boolean) => {
        if (success) {
          setIsAuthed(false);
          setLoading(false);
          handleClose();
          setMessage("Logged out successfully");

          return history.push("/");
        }
        setMessage("The system encountered an error, please try again later");
      });
    } else {
      setIsAuthed(false);
      setMessage("The system encountered an error, please try again later");
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="WebSpace Logo"
              width="80px"
            />
          </Link>
          <div>
            {routes
              .filter((route) => {
                return (
                  !route.admin && route.authed === isAuthed && route.showInNav
                );
              })
              .map((route) => (
                <Button component={Link} to={route.link}>
                  {route.name}
                </Button>
              ))}
          </div>
          {isAuthed && (
            <React.Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to={`/person/${userId}`}>
                  Profile
                </MenuItem>
                <MenuItem disabled={loading} onClick={submit}>
                  Logout {loading && <CircularProgress size={18} />}
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>

      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      ></Snackbar>
    </React.Fragment>
  );
};

export default Header;
