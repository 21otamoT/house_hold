import { Balance, Transaction } from "../types";

export function calculations(transactions: Transaction[]): Balance {
  return transactions.reduce((acc, transaction) => {
    switch(transaction.type) {
      case 'income': {
        acc.income += transaction.amount
        acc.balance = acc.income - acc.expense
        break;
      }
      case 'expense': {
        acc.expense += transaction.amount
        acc.balance = acc.income - acc.expense
        break;
      }
      default : acc.income += 0
    }
    return acc;
  },{income: 0, expense: 0, balance: 0})
}

//日付ごとの収支を計算する関数
export function calculatDailyBalances(transactions: Transaction[]):Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if(!acc[day]) {
      acc[day] = {income: 0, expense: 0, balance: 0}
    }

    switch(transaction.type) {
      case 'income' : acc[day].income += transaction.amount
        break;
      case 'expense': acc[day].expense += transaction.amount
        break;
      default: acc[day].income += 0
    }
    acc[day].balance = acc[day].income - acc[day].expense
    return acc
  },{})
}
