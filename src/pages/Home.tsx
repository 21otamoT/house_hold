import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMouth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({monthlyTransactions, setCurrentMouth}: HomeProps) => {
  const today = format(new Date(), 'yyyy年MM年dd日');
  const[currentDay,setCurrentDay] = useState(today);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calender 
          monthlyTransactions={monthlyTransactions} 
          setCurrentMouth={setCurrentMouth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
          />
      </Box>
      <Box>
        <TransactionMenu 
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
        />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home