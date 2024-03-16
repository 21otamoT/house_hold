import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculatDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";
import { Box, Typography, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import { useAppContext } from "../context/AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// interface BarChartProps {
//   monthlyTransactions: Transaction[]
//   isLoading:boolean
// }

const BarChart = () =>
  // {monthlyTransactions, isLoading}: BarChartProps
  {
    const monthlyTransactions = useMonthlyTransactions();
    const { isLoading } = useAppContext();
    const theme = useTheme();
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: "日別収支",
        },
      },
    };

    const dailyBalances = calculatDailyBalances(monthlyTransactions);

    const datelabels = Object.keys(dailyBalances).sort();
    const expenseData = datelabels.map((day) => dailyBalances[day].expense);
    const incomeData = datelabels.map((day) => dailyBalances[day].income);

    const data: ChartData<"bar"> = {
      labels: datelabels,
      datasets: [
        {
          label: "支出",
          data: expenseData,
          backgroundColor: theme.palette.expensColor.light,
        },
        {
          label: "収入",
          data: incomeData,
          backgroundColor: theme.palette.incomeColor.light,
        },
      ],
    };

    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : monthlyTransactions.length > 0 ? (
          <Bar options={options} data={data} />
        ) : (
          <Typography>データがありません</Typography>
        )}
      </Box>
    );
  };

export default BarChart;
