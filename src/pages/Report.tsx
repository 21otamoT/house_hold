import { Grid, Paper } from '@mui/material'
import React from 'react'

const Report = () => {

  const commonPaperStyle = {
    height: {xs: 'auto', md: '400px'},
    display: 'flex',
    flexDirection: 'column'
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MonthSelector />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}><CategoryChart /></Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}><BarChart /></Paper>
      </Grid>
      <Grid item xs={12}>テーブル</Grid>
    </Grid>
  )
}

export default Report