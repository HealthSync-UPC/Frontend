import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import dayjs from "dayjs";
/* import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek"; */
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


/* dayjs.extend(weekday); */
/* dayjs.extend(isoWeek); */
dayjs.extend(localizedFormat);
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/Lima")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>,
)

