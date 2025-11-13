import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es-mx";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

dayjs.locale("es-mx", {
  weekStart: 1
});

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

