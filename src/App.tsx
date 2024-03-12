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

  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [currentMouth, setCurrentMouth] = useState(new Date());
  const date = format(currentMouth, 'yyyy-MM');

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
          setTransaction(transactionsData);
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
  const monthlyTransactions = transaction.filter(transaction => {
    return transaction.date.startsWith(formatMonth(currentMouth))
  })

  //取引を保存する処理
  const handleSaveTrqnsaction = async (transaction: Schema) => {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);
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
                  onSaveTrqnsaction={handleSaveTrqnsaction}
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
