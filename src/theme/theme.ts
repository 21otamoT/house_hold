import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import { amber, blue, cyan, deepOrange, green, lightBlue, lightGreen, pink, purple, red } from "@mui/material/colors";
import { ExpenseCategory, incomeCategory } from "../types";

//incomeColorがエラーになるので型の拡張
declare module '@mui/material/styles' {
  interface Palette {
    incomeColor: PaletteColor;
    expensColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<incomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }
  //パレットの初期設定
  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expensColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;

    incomeCategoryColor?: Record<incomeCategory, string>;
    expenseCategoryColor?: Record<ExpenseCategory, string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },

  palette: {
    // 収入用
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700]
    },
    // 支出用
    expensColor: {
      main: red[500],
      light: red[100],
      dark: red[700]
    },
    // 残高用
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700]
    },

    // カテゴリ収入用
    incomeCategoryColor: {
      給与: lightBlue[500],
      副収入: cyan[200],
      おこづかい: lightGreen['A100']
    },

     // カテゴリ支出用
     expenseCategoryColor: {
      食費: deepOrange[500],
      日用品: lightGreen[500],
      住居費: amber[500],
      交際費: pink[300],
      娯楽: cyan[200],
      交通費: purple[400]
    },
  }
})