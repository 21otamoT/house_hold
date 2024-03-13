import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { Transaction } from '../types'

interface ReportProps {
  currentMouth: Date
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  monthlyTransactions: Transaction[]
}

const Report = ({currentMouth, setCurrentMonth, monthlyTransactions}:ReportProps) => {

  const commonPaperStyle = {
    height: {xs: 'auto', md: '400px'},
    display: 'flex',
    flexDirection: 'column',
    p: 2
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* 日付選択エリア */}
        <MonthSelector currentMouth={currentMouth} setCurrentMonth={setCurrentMonth}/>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}>
          {/* 円グラフ */}
          <CategoryChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart monthlyTransactions={monthlyTransactions}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TransactionTable />
      </Grid>
    </Grid>
  )
}

export default Report