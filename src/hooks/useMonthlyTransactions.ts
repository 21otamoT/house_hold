import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatMonth } from "../utils/formatting";
import { Transaction } from "../types";

const useMonthlyTransactions = (): Transaction[] => {
  const { transactions, currentMouth } = useAppContext();
  //transactionsとcurrentMouthが変更された時のみ、一月分のデータを取得
  const monthlyTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        transaction.date.startsWith(formatMonth(currentMouth))
      ),
    [transactions, currentMouth]
  );

  return monthlyTransactions;
};

export default useMonthlyTransactions;
