import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  GridList,
  GridListTile,
  Typography,
  Zoom,
} from "@material-ui/core";

import React, { useCallback, useEffect, useState } from "react";
import { ICustomField, ITask, ITaskGroup } from "../types";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";
import { getTaskGroupId, list as listTasks } from "../api/api-task";
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

const statusArr = [
  "Review",
  //, "Done"
];

type IPrices = {
  [key: string]: number;
};

interface IProps {
  [key: string]: string;
  person: string;
  project: string;
}

const prices: IPrices = {
  Weeny: 20,
  Low: 40,
  Medium: 65,
  High: 80,
};

/**
 * Tasks Component
 *
 */
const Tasks = ({ person, project }: IProps) => {
  // const [taskGroupIds, setTaskGroupIds] = useState<string[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [customFields, setCustomFields] = useState<ICustomField[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const getFieldName = useCallback(
    (id: string): string => {
      if (customFields.length > 0) {
        const index = customFields.findIndex((field) => field._id === id);
        if (index === -1) return "";

        return customFields[index].name;
      }

      return "";
    },
    [customFields]
  );

  const load = useCallback(async () => {
    const token = auth.accessTokenExists();
    if (token) {
      setLoading(true); // try {
      statusArr.forEach(async (status) => {
        try {
          const data: ITaskGroup[] = await getTaskGroupId(
            token.accessToken,
            project,
            status
          );

          if (!data) {
            throw new Error("Could not load task groups");
          }
          const tasks = await listTasks(token.accessToken, data[0]._id, person);
          console.log(tasks);
          // setTaskGroupIds((old) => [...old, data[0]._id]);
          if (!tasks) throw new Error("Could not load tasks");
          setTasks(tasks);
          setError("");
          setLoading(false);
        } catch (err) {
          console.log("Check me for object type!");
          console.log(err);
          // console.log(err);
          // console.log(typeof err.toString());
          // const errStr = typeof err === "string" ? err : err.message as string;
          setError(typeof err === "string" ? err : "Could not contact server");
          setLoading(false);
        }
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
              }
            });
            // getTotalPrice();
            setTotal((o) => total);
          }
        })
        .catch((err) => {
          console.log("Error!", err);
          // setError(typeof err === "string" ? err : "Could not load tasks");
        });
    }
  }, [getFieldName, person, project, tasks]);

  // const getTotalPrice = () =>{
  //   let newTotal = 0;
  //   tasks.forEach((task) => {
  //     const customFieldI = task.customFields.findIndex(
  //       (field) => field._id === customFieldId
  //     );
  //     if (customFieldI !== -1) {
  //       //const names =
  //       task.customFields[customFieldI].value.forEach(
  //         (value: string) => {
  //           const name = getFieldName(value);
  //           // console.log("yeehaw");
  //           newTotal += prices[name];
  //         }
  //       );
  //     }
  //   });

  //   setTotal(_o => newTotal)
  // }

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Render JSX
   */
  if (loading) return <Loading />;
  if (error !== "")
    return (
      <>
        <Typography variant="h3">Project ID: {project} </Typography>
        <Typography variant="h3">Person ID: {person} </Typography>

        <EmptyState message={error} action={load} />
      </>
    );
  return (
    <React.Fragment>
      <Typography variant="h4">Total: {total} </Typography>
      <Grid container>
        {tasks.length > 0 ? (
          tasks.map((task, i) => {
            let tier = "";
            if (task.customFields.length > 0) {
              tier = getFieldName(task.customFields[0].value[0]);
            }

            return (
              <Grid item xs={6} key={task._id}>
                <Zoom
                  in={true}
                  style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                >
                  <Card>
                    <CardHeader title={task.title} subheader={tier} />
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
      </Grid>
    </React.Fragment>
  );
};

export default Tasks;
