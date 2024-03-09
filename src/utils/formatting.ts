import { format } from "date-fns";

export function formatMonth(date: Date) {
  return format(date, 'yyyy-MM'); 
}