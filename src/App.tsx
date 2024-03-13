import React, { useEffect, useState } from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns'
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';


function App() {
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === 'object' && err !== null && 'code' in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMouth, setCurrentMouth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'Transactions'));

          const transactionsData = querySnapshot.docs.map((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            return {
              ...doc.data(),
              id: doc.id
            } as Transaction
          });
          setTransactions(transactionsData);
        }
        catch(err) {
          if(isFireStoreError(err)) {
            console.error(err);
          }
          else {
            console.error("common",err);
          }
        }
      }
      fetchTransactions();
    },[])

  //一月分のデータを取得
  const monthlyTransactions = transactions.filter(transaction => {
    return transaction.date.startsWith(formatMonth(currentMouth))
  })

  //取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Firestoreで自動生成されたID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction

      setTransactions(prevTransaction => [
        ...prevTransaction, 
        newTransaction
      ])

    } catch(err) {
      if(isFireStoreError(err)) {
        console.error(err);
      }
      else {
        console.error("common",err);
      }
    }
  }

  // 削除処理関数
  const onDeleteTransaction = async (transactionId: string) => {
    try {
      //firestoreのデータを削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      setTransactions(filterdTransactions);
    }
    catch(err) {
      if(isFireStoreError(err)) {
        console.error('firestore',err);
      }
      else {
        console.error("common",err);
      }
    }
  }

  // 更新機能関数
  const onUpdateTransaction = async (transaction: Schema, transactionId: string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);

      //更新機能
      await updateDoc(docRef, transaction);

      //フロントの更新
      const updatedTransactions = transactions.map((t) => 
        t.id === transactionId ? {...t, ...transaction} : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    }
    catch(err) {
      if(isFireStoreError(err)) {
        console.error('firestore',err);
      }
      else {
        console.error("common",err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route 
              index 
              element={
                <Home 
                  monthlyTransactions={monthlyTransactions} 
                  setCurrentMouth={setCurrentMouth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={onDeleteTransaction}
                  onUpdateTransaction={onUpdateTransaction}
                />
              }
            />
            <Route 
              path='report' 
              element={
                <Report 
                  currentMouth={currentMouth} 
                  setCurrentMonth={setCurrentMouth}
                  monthlyTransactions={monthlyTransactions}
                />
              } 
            />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
