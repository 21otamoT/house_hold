import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendatContent, Transaction } from '../types'
import { calculatDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import { theme } from '../theme/theme';
import { isSameMonth } from 'date-fns';

interface CalendarProps {
  monthlyTransactions: Transaction[]
  setCurrentMouth: React.Dispatch<React.SetStateAction<Date>>
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
  currentDay: string
  today: string
}

const Calender = ({
  monthlyTransactions, 
  setCurrentMouth, 
  setCurrentDay, 
  currentDay,
  today
  }:CalendarProps) => {
  const events = [
    { title: 'Meeting', start: new Date() },
  ]
  // 1.各日付の収支を計算する関数（呼び出し）
  const dailyBalance = calculatDailyBalances(monthlyTransactions);

  const backgroundEvent = {
    start: currentDay,
    display: 'background',
    backgroundColor: theme.palette.incomeColor.light
  }

  //カレンダーイベントの見た目を作る関数
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
    const currentMonth = dateSetInfo.view.currentStart;
    setCurrentMouth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  }

  const handleDateClick = (dateInfo:DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

  return (
    <FullCalendar 
      locale={jaLocale}
      plugins={[dayGridPlugin,interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  )
}

export default Calender