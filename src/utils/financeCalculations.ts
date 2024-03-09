import { Balance, Transaction } from "../types";

export function calculations(transactions: Transaction[]): Balance {
  return transactions.reduce((acc, transaction) => {
    switch(transaction.type) {
      case 'income': 
        acc.income += transaction.amount
        acc.balance = acc.income - acc.expense
        break;
      case 'expense': 
        acc.expense += transaction.amount
        acc.balance = acc.income - acc.expense
        break;
      default : acc.income = 0
    }
    return acc;
  },{income: 0, expense: 0, balance: 0})
}