import React, { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { CardFooter } from "@material-tailwind/react";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  CreateChart1,
  CreateBarChart,
  CreatePieChart,
} from "../../components/Charts/allCharts";

const Statistics = {
  heading: "Statistical Report",
  BriefCard: [
    {
      title: "Interviews Done",
      percentage: "65%",
      description: "The number of applicants is up by 58%",
      icon: <TrendingUpIcon color="success" />,
      id: 1,
    },
    {
      title: "Missed Interviews",
      percentage: "35%",
      description: "The number of interviews not done has dropped by 35%",
      icon: <TrendingDownIcon sx={{ color: "#FF0000" }} />,
      id: 2,
    },
  ],
};

export default function ReportsBrief() {
  //state of the ReportsViewDashboard
  const [isActive, setIsActive] = useState(false);
  //state for the view
  const [barChartDataView, setBarChartDataView] = useState(true);
  const [currentChartView, setCurrentChartView] = useState("line");
  //Control state of "isActive"
  const toggleIsActive = () => {
    setIsActive(isActive ? false : true);
  };

  //Function to call when displaying details of statics
  const ReportsView = () => {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    const changeChartView = () => {
      if (currentChartView === "line") {
        const newChartView = "bar";
        setCurrentChartView(newChartView);
      } else {
        const newChartView = "line";
        setCurrentChartView(newChartView);
      }
    };
    return (
      <Grid
        open={toggleIsActive}
        TransitionComponent={Transition}
        sx={{ width: "100%" }}
      >
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleIsActive}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="body2" component="div">
              Refresh to load the most recent data
            </Typography>
            <Grid flex sx={{ flexDirection: "column" }}>
              <Typography variant="caption" component="div">
                Line chart view
                <Switch
                  size="small"
                  checked={currentChartView === "line"}
                  //onClick={() => setBarChartDataView(!barChartDataView)}
                  onClick={changeChartView}
                  name="toggleDataView"
                  color="default"
                />
              </Typography>
              <Typography variant="caption" component="div">
                Bar chart view
                <Switch
                  size="small"
                  checked={currentChartView === "bar"}
                  //onClick={() => setBarChartDataView(!barChartDataView)}
                  onClick={changeChartView}
                  name="toggleDataView"
                  color="default"
                />
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <CreateChart1 viewBarChart={currentChartView === "bar"} />
      </Grid>
    );
  };

  return (
    <div className="flex flex-wrap gap-2 text-left justify-between">
      <div className="flex flex-col w-full text-md font-semibold">
        {Statistics.heading}
      </div>
      {isActive ? (
        <div className="flex flex-col w-full">{ReportsView()}</div>
      ) : (
        <>
          {Statistics.BriefCard.map((stat) => (
            <Card
              className="mt-4 w-48 rounded-md
              border-solid
              border
              border-gray"
              key={stat.id}
            >
              <Typography className="my-2 mx-4 text-md font-semibold">
                {stat.title}
              </Typography>
              <Box
                component="span"
                m={2}
                display="flex"
                justifyContent="space-between"
                alignps="center"
              >
                <Typography variant="body2">
                  {stat.icon} <strong>{stat.percentage}</strong>
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<StackedBarChartOutlinedIcon />}
                  onClick={toggleIsActive}
                >
                  View Details
                </Button>
              </Box>
              <CardFooter className="pb-2">
                <Typography variant="small" color="gray" className="flex-wrap">
                  {stat.description}
                </Typography>
              </CardFooter>
            </Card>
          ))}
          <Card>
            <CreatePieChart />
          </Card>
        </>
      )}
    </div>
  );
}
