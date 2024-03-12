import React from 'react'
import DailySumary from './DailySumary'
import { Transaction } from '../types'
import { Box, Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';


interface TransactionMenuProps {
  dailyTransactions: Transaction[]
  currentDay: string
  handleAddTransactionForm: () => void
}

const TransactionMenu = ({dailyTransactions, currentDay, handleAddTransactionForm}:TransactionMenuProps) => {
  return (
    <Box>
      <DailySumary 
        dailyTransactions={dailyTransactions}
        currentDay={currentDay}
      />
      <Button startIcon={<AddCircleIcon />} color='primary' onClick={handleAddTransactionForm}>
        内訳を追加
      </Button>
    </Box>
  )
}

export default TransactionMenu