import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  GridList,
  GridListTile,
  Typography,
  Zoom,
} from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import { ICustomField, ITask } from "../types";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";
import { list as listTasks } from "../api/api-task";
import auth from "../helpers/auth-helper";
import { Replay } from "@material-ui/icons";
import { list as listCustomFields } from "../api/api-custom-field";

const customFieldId = "xkvrwwsxaQYse8KbE";

const devs = {
  shane: "vkJ8wTK55L8pxP4jm",
  dylan: "Mfp8xnAtLN4yGT5ru",
};

type ITaskGroupIDs = {
  [key: string]: string;
};

const taskGroupIds: ITaskGroupIDs = {
  inReview: "bgtwBnGZeWatyyZuS",
  done: "ZkTfpcsywJ6Fem2kZ",
};

type IPrices = {
  [key: string]: number;
};

interface IProps {
  [key: string]: string;
  person: string;
  status: string;
}
/**
 * Tasks Component
 *
 */
const Tasks = ({ person, status }: IProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [customFields, setCustomFields] = useState<ICustomField[]>([]);

  const prices: IPrices = {
    Weeny: 20,
    Low: 40,
    Medium: 65,
    High: 80,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const load = useCallback(() => {
    const token = auth.accessTokenExists();
    if (token) {
      listTasks(token.accessToken, taskGroupIds[status])
        .then((res) => {
          setLoading(false);
          if (res.code) {
            setError(res.message || "Could not contact server");
          } else {
            setTasks(
              res.filter((task: ITask) => {
                return (
                  task.customFields.length > 0 && task.assignedTo[0] === person
                );
              })
            );
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(typeof err === "string" ? err : "Could not load tasks");
        });

      listCustomFields(token.accessToken, customFieldId)
        .then((res) => {
          if (res.code) {
            setError(res.message || "Could not contact server");
          } else {
            setCustomFields(res.options);

            let total = 0;
            tasks.forEach((task) => {
              const customFieldI = task.customFields.findIndex(
                (field) => field._id === customFieldId
              );
              if (customFieldI !== -1) {
                //const names =
                task.customFields[customFieldI].value.forEach(
                  (value: string) => {
                    const name = getFieldName(value);
                    // console.log("yeehaw");
                    total += prices[name];
                  }
                );

                // const prices = names.map(name =>)
                // const tier = getFieldName(task.customFields[customFieldI].value[0]);
              }
            });

            setTotal(total);
          }
        })
        .catch((err) => {
          console.log("Error!", err);
          // setError(typeof err === "string" ? err : "Could not load tasks");
        });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getFieldName = (id: string): string => {
    if (customFields.length > 0) {
      const index = customFields.findIndex((field) => field._id === id);
      if (index === -1) return "";

      return customFields[index].name;
    }

    return "";
  };

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "") return <EmptyState message={error} action={load} />;
  return (
    <React.Fragment>
      <Typography variant="h4">Total: {total} </Typography>
      <GridList>
        {tasks.length > 0 ? (
          tasks
            // .filter((task) => task.customFields.length > 0)
            .map((task, i) => {
              const tier = getFieldName(task.customFields[0].value[0]);

              return (
                <GridListTile
                  // task
                  // cellHeight={400}
                  // sm={6}
                  // xs={12}
                  key={task._id}
                  // style={{ width: 408 }}
                >
                  <Zoom
                    in={true}
                    style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                  >
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h3" component="h3">
                          {task.title} - {tier}
                          {/* {customFields.length > 0
                          ? customFields[
                              customFields.findIndex(
                                (field) =>
                                  field._id === task.customFields[0]._id
                              )
                            ].name
                          : ""} */}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </GridListTile>
              );
            })
        ) : (
          <Grid item sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  No Tasks Found
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
      </GridList>
    </React.Fragment>
  );
};

export default Tasks;
