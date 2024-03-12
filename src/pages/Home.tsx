import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMouth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (transactionId: string) => Promise<void>
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}

const Home = ({
  monthlyTransactions, 
  setCurrentMouth, 
  onSaveTransaction,
  onDeleteTransaction,
  onUpdateTransaction
}: HomeProps) => {
  const today = format(new Date(), 'yyyy年MM年dd日');
  const [currentDay,setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  const onCloseForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
    setSelectedTransaction(null);
  }

  //フォームの開閉処理
  const handleAddTransactionForm = () => {
    if (selectedTransaction) { 
      setSelectedTransaction(null)
    }
    else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen)
    }
  }

  //取り引きが選択された時の処理
  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrawerOpen(true)
    setSelectedTransaction(transaction)
  }

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
          handleAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm 
          onCloseForm={onCloseForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
          onUpdateTransaction={onUpdateTransaction}
        />
      </Box>
    </Box>
  )
}

export default Home