import React, { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import Title from "./Title";
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



//chart data display function
export const CreateChart1 = () => {
  const theme = useTheme();
  return (
    <Fragment>
      <Title>Line Chart</Title>
      <ResponsiveContainer>
        <LineChart
          width={730} height={250} data={IDonedata}
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
            label={{ value: 'Applicants', angle: 270, position: 'left', offset: 0 }} 
          >
          
          </YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Tooltip />
          <Legend />
          <Line
            isAnimationActive={false}
            dataKey='InDValue'
            type='monotone'
            stroke={theme.palette.primary.main}
            dot={true}
          />

            <Line
              isAnimationActive={false}
              dataKey="IdValue"
              type='monotone'
              stroke={theme.palette.success.main}
              dot={true}
            />

        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
};
 export const CreateBarChart = () => {
  const theme = useTheme();
  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <Fragment>
      <Title>Barchart</Title>
      <BarChart width={730} height={250} data={IDonedata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: 'Applicants', angle: 270, position: 'left', offset: 0 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="InDValue" fill={theme.palette.primary.main} />
        <Bar dataKey="IdValue" fill={theme.palette.success.main} />
      </BarChart>
    </Fragment>
  );
}; 

export const CreatePieChart =()=>{
  return(
    <PieChart width={730} height={250}>
      <Pie data={IDonedata} dataKey="InDValue" nameKey="InDValue" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
      <Pie data={IDonedata} dataKey="IdValue" nameKey="IdValue" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
    </PieChart>
  )
}