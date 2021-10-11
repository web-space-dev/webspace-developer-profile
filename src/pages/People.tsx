import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Zoom,
} from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";

import { list } from "../api/api-people";
import auth from "../helpers/auth-helper";
import { AccountCircle, Replay } from "@material-ui/icons";
import { IPerson } from "../types";
import { Link } from "react-router-dom";
/**
 * People Component
 *
 */
const People = () => {
  const [people, setPeople] = useState<IPerson[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    const token = auth.accessTokenExists();
    if (token) {
      list(token.accessToken)
        .then((res) => {
          setLoading(false);
          if (res.code) {
            setError(res.message || "Could not contact server");
          } else {
            setPeople(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(typeof err === "string" ? err : "Could not load people");
        });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Typography variant="h2">People</Typography>
      <Grid container spacing={2}>
        {people.length > 0 ? (
          people.map((person, i) => {
            return (
              <Grid item md={3} sm={6} xs={12} key={person._id}>
                <Zoom
                  in={true}
                  style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                >
                  <Card>
                    <CardActionArea
                      component={Link}
                      to={`/person/${person._id}`}
                    >
                      <CardHeader
                        avatar={<AccountCircle />}
                        title={`${person.name.first} ${person.name.last}`}
                        subheader={person.contactEmails[0].address}
                      />
                    </CardActionArea>
                  </Card>
                </Zoom>
              </Grid>
            );
          })
        ) : (
          <Grid item sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  No People Found
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Replay />}
                  onClick={load}
                >
                  Try Again
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default People;
