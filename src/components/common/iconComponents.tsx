import React from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import HouseIcon from '@mui/icons-material/House';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TrainIcon from '@mui/icons-material/Train';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { ExpenseCategory, incomeCategory } from '../../types';

const iconComponents:Record<incomeCategory | ExpenseCategory, JSX.Element> = {
  食費: <FastfoodIcon fontSize='small'/>,
  日用品: <LocalLaundryServiceIcon fontSize='small'/>,
  住居費: <HouseIcon fontSize='small'/>,
  交際費: <SocialDistanceIcon fontSize='small'/>,
  娯楽: <SportsEsportsIcon fontSize='small'/>,
  交通費: <TrainIcon fontSize='small'/>,
  給与: <CurrencyYenIcon fontSize='small'/>,
  副収入: <CurrencyYenIcon fontSize='small'/>,
  おこづかい: <CurrencyYenIcon fontSize='small'/>,
}

export default iconComponents
