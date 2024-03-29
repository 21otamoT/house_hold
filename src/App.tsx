import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Transaction } from "./types/index";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";
import { AppContextPrivider } from "./context/AppContext";
import { isFireStoreError } from "./utils/errorHandling";

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMouth, setCurrentMouth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);

  //firebaseエラーかどうかの処理
  // function isFireStoreError(
  //   err: unknown
  // ): err is { code: string; message: string } {
  //   return typeof err === "object" && err !== null && "code" in err;
  // }

  //取引を保存する処理
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   try {
  //     // Add a new document with a generated id.
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);
  //     console.log("Firestoreで自動生成されたID: ", docRef.id);

  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;

  //     setTransactions((prevTransaction) => [
  //       ...prevTransaction,
  //       newTransaction,
  //     ]);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error(err);
  //     } else {
  //       console.error("common", err);
  //     }
  //   }
  // };

  // // 削除処理関数
  // const onDeleteTransaction = async (
  //   transactionIds: string | readonly string[]
  // ) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds)
  //       ? transactionIds
  //       : [transactionIds];

  //     for (const id of idsToDelete) {
  //       //firestoreのデータを削除
  //       await deleteDoc(doc(db, "Transactions", id));
  //     }
  //     // const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
  //     const filterdTransactions = transactions.filter(
  //       (transaction) => !idsToDelete.includes(transaction.id)
  //     );
  //     setTransactions(filterdTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestore", err);
  //     } else {
  //       console.error("common", err);
  //     }
  //   }
  // };

  // // 更新機能関数
  // const onUpdateTransaction = async (
  //   transaction: Schema,
  //   transactionId: string
  // ) => {
  //   try {
  //     const docRef = doc(db, "Transactions", transactionId);

  //     //更新機能
  //     await updateDoc(docRef, transaction);

  //     //フロントの更新
  //     const updatedTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     setTransactions(updatedTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firestore", err);
  //     } else {
  //       console.error("common", err);
  //     }
  //   }
  // };

  return (
    <AppContextPrivider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                  // monthlyTransactions={monthlyTransactions}
                  // setCurrentMouth={setCurrentMouth}
                  // onSaveTransaction={handleSaveTransaction}
                  // onDeleteTransaction={onDeleteTransaction}
                  // onUpdateTransaction={onUpdateTransaction}
                  />
                }
              />
              <Route
                path="report"
                element={
                  <Report
                  // currentMouth={currentMouth}
                  // setCurrentMonth={setCurrentMouth}
                  // monthlyTransactions={monthlyTransactions}
                  // isLoading={isLoading}
                  // onDeleteTransaction={onDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextPrivider>
  );
}

export default App;
