import React from 'react'
import DailySumary from './DailySumary'
import { Transaction } from '../types'


interface TransactionMenuProps {
  dailyTransactions: Transaction[]
  currentDay: string
}

const TransactionMenu = ({dailyTransactions, currentDay}:TransactionMenuProps) => {
  return (
      <DailySumary 
        dailyTransactions={dailyTransactions}
        currentDay={currentDay}
      />
  )
}

export default TransactionMenu