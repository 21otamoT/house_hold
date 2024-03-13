import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { calculatDailyBalances } from '../utils/financeCalculations';
import { Transaction } from '../types';
import { useTheme } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[]
}

const BarChart = ({monthlyTransactions}: BarChartProps) => {
  const theme = useTheme()
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };

  const dailyBalances = calculatDailyBalances(monthlyTransactions)

  const datelabels = Object.keys(dailyBalances).sort()
  const expenseData = datelabels.map(day => dailyBalances[day].expense)
  const incomeData = datelabels.map(day => dailyBalances[day].income)

  const data: ChartData<'bar'> = {
    labels:datelabels,
    datasets: [
      {
        label: '支出',
        data: expenseData,
        backgroundColor: theme.palette.expensColor.light,
      },
      {
        label: '収入',
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  )
}

export default BarChart
