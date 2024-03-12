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
import { addDoc, collection, getDocs } from 'firebase/firestore';
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
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

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
                  selectedTransaction={selectedTransaction}
                  setSelectedTransaction={setSelectedTransaction}
                />
              }
            />
            <Route path='report' element={<Report />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
