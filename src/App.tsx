import { Navigate, Route, Routes } from "react-router"

import AuthPages from "./iam/pages/AuthPages"
import { RegisterForm } from "./iam/components/RegisterForm"
import { Qrimg } from "./iam/components/Qrimg"
import { CodeAuth } from "./iam/components/CodeAuth"
import { LoginForm } from "./iam/components/LoginForm"
import { MainLayout } from "./shared/pages/MainLayout"
import { DashboardPage } from "./dashboard/pages/DashboardPage"
import { IoTPage } from "./iot/pages/IoTPage"
import { InventoryPage } from "./inventory/page/InventoryPage"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<AuthPages />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify" element={<CodeAuth />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/setup-mfa" element={<Qrimg />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/devices" element={<IoTPage />} />
        <Route path="/monitoring" element={<p>Monitoring</p>} />
        <Route path="/alerts" element={<p>Alerts</p>} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/report" element={<p>Report</p>} />
        <Route path="/settings" element={<p>Settings</p>} />
      </Route>

    </Routes>
  )

}
export default App
