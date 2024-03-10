import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendatContent, Transaction } from '../types'
import { calculatDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMouth: React.Dispatch<React.SetStateAction<Date>>
}

const Calender = ({monthlyTransactions, setCurrentMouth}:CalendarProps) => {
  const events = [
    { title: 'Meeting', start: new Date() },
  ]
  // 1.各日付の収支を計算する関数（呼び出し）
  const dailyBalance = calculatDailyBalances(monthlyTransactions);

  const renderEventContent = (eventInfo: EventContentArg) => {
    
    return (
      <div>
        <div className='money' id='event-income'>
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id='event-expense'>
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id='event-balance'>
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const creatCalenarEvents = (dailyBalance: Record<string, Balance>): CalendatContent[] => {
    return Object.keys(dailyBalance).map(date => {

      const {income, expense, balance} = dailyBalance[date];

      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance)
      }
    })
  }

  const calendarEvents = creatCalenarEvents(dailyBalance);

  const handleDateSet = (dateSetInfo:DatesSetArg) => {
    setCurrentMouth(dateSetInfo.view.currentStart)
  }

  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calender