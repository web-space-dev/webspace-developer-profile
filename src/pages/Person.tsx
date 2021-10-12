import { Grid, Typography } from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";

import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";

import { show } from "../api/api-people";
import auth from "../helpers/auth-helper";
import { IPerson } from "../types";
import Tasks from "./Tasks";

/**
 * Component types
 */
interface IProps {
  match: { params: { id: string } };
}

/**
 * Person Component
 *
 */
const Person = ({ match }: IProps) => {
  const [person, setPerson] = useState<IPerson | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    const token = auth.accessTokenExists();
    const { id } = match.params;
    if (token) {
      setError("");
      setLoading(true);

      show(token.accessToken, id)
        .then((res) => {
          setLoading(false);
          if (res.code) {
            setError(res.message || "Could not contact server");
          } else {
            setPerson(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(typeof err === "string" ? err : "Could not load person");
        });
    }
  }, [match.params]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "" || person == null)
    return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Typography variant="h2">
        {person.name.first} {person.name.last}
      </Typography>
      <Typography variant="subtitle1">
        {person.contactEmails[0].address}
      </Typography>
      <Typography variant="h3">Tasks in Review</Typography>
      <Tasks person={person._id} status={"inReview"} />
      <Typography variant="h3">Tasks Completed</Typography>
      <Tasks person={person._id} status={"done"} />
      {/* <Grid container spacing={2}></Grid> */}
    </React.Fragment>
  );
};

export default Person;
