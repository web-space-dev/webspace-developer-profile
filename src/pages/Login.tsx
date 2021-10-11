import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  createStyles,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { IHistoryProps } from "../types";
import { Check, Error } from "@material-ui/icons";
import EmptyState from "../components/global/EmptyState";
import auth from "../helpers/auth-helper";
import { signin } from "../api/api-auth";

/**
 * Injected styles
 *
 * @param {int} spacing
 */
const styles = ({ spacing }: Theme) =>
  createStyles({
    wrapper: {
      padding: spacing(4),
    },
    error: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

type IProps = {
  classes: {
    wrapper: string;
    error: string;
  };
  history: IHistoryProps;
};

/**
 * CreateItem Component
 *
 * @param {History} history - the browser history object
 * @param {Theme} classes - classes passed from Material UI Theme
 */
const Login = ({ history, classes }: IProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jwt = auth.accessTokenExists();

  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
      passed = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email");
      passed = false;
    } else setEmailError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      passed = false;
    } else setPasswordError("");

    return passed;
  };
  /**
   * Check validation and then run the
   * item create network request
   *
   * On success, redirect to the home page
   */
  const submit = () => {
    if (handleValidation()) {
      setLoading(true);

      signin(email, password).then((data) => {
        if (!data || data.error) {
          setLoading(false);
          return setError(data && data.error ? data.error : "Could not login");
        }
        console.log(data);

        const { accessToken, accessTokenExpiresAt, user } = data.data;
        const { email, name, _id } = user;
        auth.setAccessToken(
          {
            accessToken,
            accessTokenExpiresAt,
            email,
            name,
            _id,
          },
          (res) => {
            if (res) {
              history.push(`/person/` + _id);
            }
          }
        );
        // localStorage.setItem("existing", "true");
        // history.push(`/`);
      });
    }
  };

  /**
   * Render JSX
   */
  if (jwt) return <EmptyState message={"You have already logged in"} />;
  return (
    <React.Fragment>
      <Typography variant="h2">Login</Typography>
      <Card elevation={3} className={classes.wrapper}>
        <CardContent>
          <TextField
            name="email"
            label="Email"
            autoFocus={true}
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={emailError !== ""}
            helperText={emailError}
          />

          <TextField
            name="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={passwordError !== ""}
            helperText={passwordError}
          />
        </CardContent>
        <br />
        {error !== "" && (
          <Typography
            component="p"
            className={classes.error}
            color="error"
            style={{ textAlign: "center" }}
          >
            <Error color="error" />
            {error}
          </Typography>
        )}
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={submit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={18} /> : <Check />}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Login);
