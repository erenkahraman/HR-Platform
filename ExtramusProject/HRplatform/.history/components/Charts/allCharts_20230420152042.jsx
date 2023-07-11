import React, { Fragment, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import axios from "axios";
import cookie from "js-cookie";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
  Pie,
  PieChart,
} from "recharts";
import { IDonedata } from "../../pages/applicants/headers"; //Import Static chart data
import { Grid } from "@mui/material";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//chart data display function
export const CreateChart1 = ({ viewBarChart }) => {
  const theme = useTheme();
  const [interviewStatistics, setInterviewStatistics] = useState([]);
  const [HrInterviewData, setHrInterviewData] = useState([]);
  const [CEOInterviewData, setCEOInterviewData] = useState([]);
  const token = cookie?.get("token");

  useEffect(() => {
    const asyncRequest = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.get(
          `/api/applicant/statistics`,
          { params: { token: token } },
          config
        );

        const initialMonthStatus = {
          hrInterviewDoneTotal: 0,
          hrInterviewNotDoneTotal: 0,
          ceoInterviewDoneTotal: 0,
          ceoInterviewNotDoneTotal: 0,
        };

        // prepare statistics for each month in a year
        let interviewStatisticsByMonth = Array(12).fill(initialMonthStatus);

        const interviewStatuses = data;
        interviewStatuses.forEach((eachInterview) => {
          const hrInterviewDate = new Date(eachInterview.hrInterviewDate);
          const hrInterviewMonthIndex = hrInterviewDate.getMonth();

          if (eachInterview.interviewStatuses === undefined) {
            return;
          }

          const currentMonthHrStatistics = Object.assign(
            {},
            interviewStatisticsByMonth[hrInterviewMonthIndex]
          );

          currentMonthHrStatistics.hrInterviewDoneTotal += Number(
            eachInterview.interviewStatuses.isHrInterviewDone
          );
          currentMonthHrStatistics.hrInterviewNotDoneTotal += Number(
            !eachInterview.interviewStatuses.isHrInterviewDone
          );

          const ceoInterviewDate = new Date(eachInterview.ceoInterviewDate);
          const ceoInterviewMonthIndex = ceoInterviewDate.getMonth();

          const currentMonthCeoStatistics = Object.assign(
            {},
            interviewStatisticsByMonth[ceoInterviewMonthIndex]
          );

          currentMonthCeoStatistics.ceoInterviewDoneTotal += Number(
            eachInterview.interviewStatuses.isCeoInterviewDone
          );
          currentMonthCeoStatistics.ceoInterviewNotDoneTotal += Number(
            !eachInterview.interviewStatuses.isCeoInterviewDone
          );

          interviewStatisticsByMonth[hrInterviewMonthIndex] =
            currentMonthHrStatistics;
          interviewStatisticsByMonth[ceoInterviewMonthIndex] =
            currentMonthCeoStatistics;
        });
        setInterviewStatistics(interviewStatisticsByMonth);

        let hrInterviewStatistics = [];
        let CEOInterviewStatistics = [];
        interviewStatisticsByMonth.forEach((eachMonth, i) => {
          const monthName = months[i];
          const hrInterviewDone = eachMonth.hrInterviewDoneTotal;
          const hrInterviewNotDone = eachMonth.hrInterviewNotDoneTotal;
          const ceoInterviewDone = eachMonth.ceoInterviewDoneTotal;
          const ceoInterviewNotDone = eachMonth.ceoInterviewNotDoneTotal;
          //HR interview month object
          const HrMonthObj = {
            month: monthName,
            doneTotal: hrInterviewDone,
            notDoneTotal: hrInterviewNotDone,
          };
          hrInterviewStatistics.push(HrMonthObj);

          //CEO interview month object
          const CEOMonthObj = {
            month: monthName,
            doneTotal: ceoInterviewDone,
            notDoneTotal: ceoInterviewNotDone,
          };
          CEOInterviewStatistics.push(CEOMonthObj);
        });

        setHrInterviewData(hrInterviewStatistics);
        setCEOInterviewData(CEOInterviewStatistics);
      } catch (e) {
        console.error(e);
      }
    };
    asyncRequest();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      {viewBarChart ? (
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 280,
                borderRadius: 0,
              }}
            >
              <Fragment>
                <Title>HR Interviews</Title>
                <ResponsiveContainer>
                  <BarChart
                    width={730}
                    height={250}
                    data={HrInterviewData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      label={{
                        value: "Applicants",
                        angle: 270,
                        position: "left",
                        offset: 0,
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="notDoneTotal"
                      fill={theme.palette.primary.main}
                    />
                    <Bar
                      dataKey="doneTotal"
                      fill={theme.palette.success.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Fragment>
            </Paper>
          </Grid>
          {/* Students and countries */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Fragment>
                <Title>CEO Interviews</Title>
                <ResponsiveContainer>
                  <BarChart
                    width={730}
                    height={250}
                    data={CEOInterviewData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      label={{
                        value: "Applicants",
                        angle: 270,
                        position: "left",
                        offset: 0,
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="notDoneTotal"
                      fill={theme.palette.primary.main}
                    />
                    <Bar
                      dataKey="doneTotal"
                      fill={theme.palette.success.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Fragment>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container rowSpacing={3} columnSpacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 280,
                borderRadius: 0,
              }}
            >
              <Fragment>
                <Title>HR Interviews</Title>
                <ResponsiveContainer>
                  <LineChart
                    width={730}
                    height={250}
                    data={HrInterviewData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="month"
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                      label={{
                        value: "Applicants",
                        angle: 270,
                        position: "left",
                        offset: 0,
                      }}
                    ></YAxis>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Line
                      isAnimationActive={false}
                      dataKey="doneTotal"
                      type="monotone"
                      stroke={theme.palette.success.main}
                      dot={true}
                    />

                    <Line
                      isAnimationActive={false}
                      dataKey="notDoneTotal"
                      type="monotone"
                      stroke={theme.palette.primary.main}
                      dot={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Fragment>
            </Paper>
          </Grid>

          {/* Students and countries */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 280,
              }}
            >
              <Fragment>
                <Title>CEO Interviews</Title>
                <ResponsiveContainer>
                  <LineChart
                    width={730}
                    height={250}
                    data={CEOInterviewData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="month"
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                    />
                    <YAxis
                      stroke={theme.palette.text.secondary}
                      style={theme.typography.body2}
                      label={{
                        value: "Applicants",
                        angle: 270,
                        position: "left",
                        offset: 0,
                      }}
                    ></YAxis>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Line
                      isAnimationActive={false}
                      dataKey="doneTotal"
                      type="monotone"
                      stroke={theme.palette.success.main}
                      dot={true}
                    />

                    <Line
                      isAnimationActive={false}
                      dataKey="notDoneTotal"
                      type="monotone"
                      stroke={theme.palette.primary.main}
                      dot={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Fragment>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

const CreatePieChart = () => {
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={IDonedata}
        dataKey="InDValue"
        nameKey="InDValue"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
      />
      <Pie
        data={IDonedata}
        dataKey="IdValue"
        nameKey="IdValue"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#82ca9d"
        label
      />
    </PieChart>
  );
};
