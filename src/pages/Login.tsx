import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  createStyles,
  TextField,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { IHistoryProps } from "../types";
import { create } from "../api/api-item";
import { ArrowBack, Check, Error } from "@material-ui/icons";
import EmptyState from "../components/global/EmptyState";
import auth from "../helpers/auth-helper";

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
const AddItem = ({ history, classes }: IProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jwt = auth.isAuthenticated();
// const jwt = false;
  /**
   * Handle validation for form inputs
   */
  const handleValidation = () => {
    let passed = true;

    // if (email.length < 3) {
    //   setEmailError("Email must be at least 4 characters");
    //   passed = false;
    // } else setEmailError("");

    // if (link.length < 5) {
    //   setLinkError("Link must be at least 5 characters");
    //   passed = false;
    // } else setLinkError("");

    // if (!link.includes("http")) {
    //   setLinkError("Link must be a valid link");
    //   passed = false;
    // } else setLinkError("");

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
      // setLoading(true);

      // let username, portfolioLink;

      // create({ email, username, link: portfolioLink }).then((data) => {
      //   if (!data || data.error) {
      //     setLoading(false);
      //     return setError(
      //       data && data.error ? data.error : "Could not create portfolio item"
      //     );
      //   }
      //   localStorage.setItem("existing", "true");
      //   history.push(`/`);
      // });
    }
  };

  /**
   * Render JSX
   */
  if (jwt)
    return <EmptyState message={"You have already logged in"} />;
  return (
    <React.Fragment>
      <Button component={Link} to="/" startIcon={<ArrowBack />}>
        Back
      </Button>
      <Card elevation={3} className={classes.wrapper}>
        <CardHeader email="Create Portfolio Item" />

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
            name="link"
            label="Link"
            margin="normal"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            error={linkError !== ""}
            helperText={linkError}
            multiline
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
            Create
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(AddItem);
