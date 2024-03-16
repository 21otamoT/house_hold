import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calender from "../components/Calender";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { format } from "date-fns";
import { Schema } from "../validations/schema";
import { DateClickArg } from "@fullcalendar/interaction";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

// interface HomeProps {
//   monthlyTransactions: Transaction[];
//   setCurrentMouth: React.Dispatch<React.SetStateAction<Date>>;
//   onSaveTransaction: (transaction: Schema) => Promise<void>;
//   onDeleteTransaction: (
//     transactionId: string | readonly string[]
//   ) => Promise<void>;
//   onUpdateTransaction: (
//     transaction: Schema,
//     transactionId: string
//   ) => Promise<void>;
// }

const Home = () =>
  //   {
  //   monthlyTransactions,
  //   setCurrentMouth,
  //   onSaveTransaction,
  //   onDeleteTransaction,
  //   onUpdateTransaction
  // }: HomeProps
  {
    const { isMobile } = useAppContext();
    const monthlyTransactions = useMonthlyTransactions();
    const today = format(new Date(), "yyyy年MM年dd日");
    const [currentDay, setCurrentDay] = useState(today);
    const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
      useState<Transaction | null>(null);
    const [isMobileDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    // 1日分のデータを取得
    const dailyTransactions = useMemo(() => {
      return monthlyTransactions.filter(
        (transaction) => transaction.date === currentDay
      );
    }, [monthlyTransactions, currentDay]);

    const onCloseForm = () => {
      setSelectedTransaction(null);
      if (isMobile) {
        setIsDialogOpen(!isDialogOpen);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    };

    //フォームの開閉処理
    const handleAddTransactionForm = () => {
      if (isMobile) {
        setIsDialogOpen(true);
      } else {
        if (selectedTransaction) {
          setSelectedTransaction(null);
        } else {
          setIsEntryDrawerOpen(!isEntryDrawerOpen);
        }
      }
    };

    //取り引きが選択された時の処理
    const handleSelectTransaction = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      if (isMobile) {
        setIsDialogOpen(true);
      } else {
        setIsEntryDrawerOpen(true);
      }
    };

    // モバイル用Drawerを閉じる関数
    const handleCloseMobileDrawer = () => {
      setIsDrawerOpen(false);
    };

    // 日付を選択した時の処理
    const handleDateClick = (dateInfo: DateClickArg) => {
      setCurrentDay(dateInfo.dateStr);
      setIsDrawerOpen(true);
    };

    return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }}>
          <MonthlySummary
          // monthlyTransactions={monthlyTransactions}
          />
          <Calender
            // monthlyTransactions={monthlyTransactions}
            // setCurrentMouth={setCurrentMouth}
            setCurrentDay={setCurrentDay}
            currentDay={currentDay}
            today={today}
            onDateClick={handleDateClick}
          />
        </Box>
        <Box>
          <TransactionMenu
            dailyTransactions={dailyTransactions}
            currentDay={currentDay}
            handleAddTransactionForm={handleAddTransactionForm}
            onSelectTransaction={handleSelectTransaction}
            // isMobile={isMobile}
            isMobileDrawerOpen={isMobileDrawerOpen}
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
          <TransactionForm
            onCloseForm={onCloseForm}
            isEntryDrawerOpen={isEntryDrawerOpen}
            currentDay={currentDay}
            // onSaveTransaction={onSaveTransaction}
            selectedTransaction={selectedTransaction}
            // onDeleteTransaction={onDeleteTransaction}
            setSelectedTransaction={setSelectedTransaction}
            // onUpdateTransaction={onUpdateTransaction}
            // isMobile={isMobile}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Box>
      </Box>
    );
  };

export default Home;
