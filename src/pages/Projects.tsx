import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Zoom,
} from "@material-ui/core";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import Loading from "../components/global/Loading";
import EmptyState from "../components/global/EmptyState";
import auth from "../helpers/auth-helper";
import { Replay } from "@material-ui/icons";
import { list } from "../api/api-project";
import { IProject } from "../types";
import Tasks from "./Tasks";

type IProjectGroupIDs = {
  [key: string]: string;
};

type IPrices = {
  [key: string]: number;
};

interface IProps {
  [key: string]: string;
  person: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      // hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {/* {value === index && ( */}
      <Box sx={{ p: 3 }}>
        {/* <Typography> */}
        {children}
        {/* </Typography> */}
      </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

/**
 * Projects Component
 *
 */
const Projects = ({ person }: IProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const prices: IPrices = {
    Weeny: 20,
    Low: 40,
    Medium: 65,
    High: 80,
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    const token = auth.accessTokenExists();
    if (token) {
      list(token.accessToken, person)
        .then((res) => {
          setLoading(false);
          if (res.code) {
            setError(res.message || "Could not contact server");
          } else {
            setProjects(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(typeof err === "string" ? err : "Could not load projects");
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
      {projects.length > 0 ? (
        <>
          <Tabs
            // orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={(e, val) => handleChange(val)}
            aria-label="Vertical tabs example"
          >
            {/* <Tab label="Item One" {...a11yProps(0)} /> */}
            {projects.map((project, i) => (
              <Tab label={project.name} {...a11yProps(i)} />
            ))}
          </Tabs>

          <TabPanel value={value} index={value}>
            <Tasks person={person} project={projects[value]._id} />
          </TabPanel>

          {/* {projects
            .filter((p, i) => i === value)
            .map((project, i) => {
              console.log("loading" + i);
              return (
                <TabPanel value={value} index={i}>
                  <Tasks person={person} project={project._id} />
                </TabPanel>
              );
            })} */}
        </>
      ) : (
        <Grid container>
          <Grid item sm={12} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  No projects found
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
        </Grid>
      )}
    </React.Fragment>
  );
};

export default Projects;
