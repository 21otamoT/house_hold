import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import React from 'react'

const MonthlySummary = () => {
  return (
    <Grid container spacing={{xs: 1, sm: 2}} mb={2}>
      <Grid item xs={4} display={'flex'} flexDirection={'column'}>
        <Card 
          sx={{
            bgcolor: theme => theme.palette.incomeColor.main, 
            color: 'white', 
            borderRadius: '10px',
            flexGrow: 1
          }}
          >
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={'row'}>
              <CallMadeIcon sx={{fontSize: '2rem'}}/>
              <Typography>収入</Typography>
            </Stack>
            <Typography 
              textAlign={'right'} 
              variant='h5' 
              fontWeight={'fontWeightBold'}
              sx={{wordBreak: 'break-word', fontSize: {xs: '.8rem', sm: '1rem', md: '1.2rem'}}}
              flexGrow={1}
            >
            &yen;300
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4} display={'flex'} flexDirection={'column'}>
        <Card 
          sx={{
            bgcolor: theme => theme.palette.expensColor.main, 
            color: 'white', 
            borderRadius: '10px',
            flexGrow: 1
          }}
          >
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={'row'}>
              <CallReceivedIcon sx={{fontSize: '2rem'}}/>
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={'right'}
              variant='h5'
              fontWeight={'fontWeightBold'}
              sx={{wordBreak: 'break-word', fontSize: {xs: '.8rem', sm: '1rem', md: '1.2rem'}}}
            >
              &yen;100
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4} display={'flex'} flexDirection={'column'}>
        <Card 
          sx={{
            bgcolor: theme => theme.palette.balanceColor.main, 
            color: 'white', 
            borderRadius: '10px',
            flexGrow: 1
          }}
          >
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={'row'}>
              <AccountBalanceIcon sx={{fontSize: '2rem'}}/>
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={'right'}
              variant='h5'
              fontWeight={'fontWeightBold'}
              sx={{wordBreak: 'break-word', fontSize: {xs: '.8rem', sm: '1rem', md: '1.2rem'}}}
            >
              &yen;200
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MonthlySummary