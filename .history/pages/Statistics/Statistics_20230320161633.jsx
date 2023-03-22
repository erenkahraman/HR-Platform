import React, { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import { Box, Button, Card, CardBody, Grid, Paper, Typography } from "@mui/material";
import { CardFooter } from "@material-tailwind/react";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CreateChart1, CreateBarChart, CreatePieChart } from "../../components/Charts/allCharts";

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

export default function statistics() {
  //state of the ReportsViewDashboard
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState({ data: [] });
  //Control state of "isActive"
  const toggleIsActive = () => {
    setIsActive(isActive ? false : true);
  };

  //Function to call when displaying details of statics
  const ReportsView = () => {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <Grid
        open={toggleIsActive}
        TransitionComponent={Transition}
        sx={{ width: "100%" }}
      >
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleIsActive}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="body2" component="p">
              Refresh to load the most recent data
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%" }}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 280,
              }}
            >
              <CreateChart1 />
            </Paper>
          </Grid>
          <Grid container rowSpacing={3} columnSpacing={2} paddingY={2}>
            {/* Students and countries */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <CreateBarChart />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );
  };
  //loading data into the charts if ReportsView is Active
  useEffect(() => {
    console.log("isActive is: ", isActive);

    if (isActive) {
      fetchData();
    } else {
      setData({ data: [] });
    }
  }, [isActive]);

  const fetchData = async () => {
    const response = await fetch("https://reqres.in/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const result = await response.json();

    console.log("result is: ", JSON.stringify(result, null, 4));

    setData(result);
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

export default Statistics;