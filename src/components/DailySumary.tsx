import { Card, CardActionArea, CardContent, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import React from 'react'
import { calculations } from '../utils/financeCalculations';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/formatting';
import { theme } from '../theme/theme';
import iconComponents from './common/iconComponents';


interface DailySumaryProps {
  dailyTransactions: Transaction[],
  currentDay: string
}

const DailySumary = ({dailyTransactions, currentDay}:DailySumaryProps) => {
  const {income, expense, balance} = calculations(dailyTransactions);

  return (
    <div>
      <Typography fontWeight={'bold'}>日時:{currentDay}</Typography>
      <Grid container spacing={{xs: 1, sm: 2}} mb={2} sx={{pl:{sm: '8px', md: '12px', lg: '16px'}}}>
        {/* 収入 */}
        <Grid item xs={4} display={'flex'} flexDirection={'column'}>
          <Card 
            sx={{
              bgcolor: theme => theme.palette.incomeColor.main, 
              color: 'white', 
              borderRadius: '10px',
              flexGrow: 1,
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
              &yen;{formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 支出 */}
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
                &yen;{formatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 残高 */}
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
                &yen;{formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Stack>
        <List>
          {dailyTransactions.map(dailyTransaction => (
            <ListItem>
              <Card sx={{
                      width: '100%',
                      backgroundColor: dailyTransaction.type === 'income' 
                      ? theme => theme.palette.incomeColor.light
                      : theme => theme.palette.expensColor.light 
                    }}>
                <CardActionArea>
                  <CardContent>
                    <Grid container spacing={{xs:1, sm:2}} alignItems={'center'} wrap='wrap'>
                      <Grid item xs={1}>
                        {/* icon */}
                        {iconComponents[dailyTransaction.category]}
                      </Grid>
                      <Grid item display={'flex'}>
                        <Typography flexGrow={1}>
                          {dailyTransaction.category}
                        </Typography>
                        <Typography flexGrow={1}>
                          {dailyTransaction.content}
                        </Typography>
                        <Typography flexGrow={1}>
                          &yen;{formatCurrency(dailyTransaction.amount)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItem>
            ))}
        </List>
      </Stack>
    </div>
  )
}

export default DailySumary
