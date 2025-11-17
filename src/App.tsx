import { Navigate, Route, Routes } from "react-router"
import { CodeAuth } from "./iam/components/CodeAuth"
import { LoginForm } from "./iam/components/LoginForm"
import { Qrimg } from "./iam/components/Qrimg"
import { RegisterForm } from "./iam/components/RegisterForm"
import AuthPages from "./iam/pages/AuthPages"
import { PrivateRoute } from "./shared/pages/PrivateRoute"
import { DashboardPage } from "./dashboard/pages/DashboardPage"
import { IoTPage } from "./iot/pages/IoTPage"
import SettingsPage from "./settings/pages/SettingsPage"
import { useGlobalStore } from "./shared/stores/globalstore"
import { useEffect } from "react"
import { InventoryPage } from "./inventory/page/InventoryPage"
import ZoneManagementPage from "./zones/pages/ZonesPage"
import { AlertPage } from "./alert/pages/AlertPage"

function App() {
  const { setJwt } = useGlobalStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setJwt(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<AuthPages />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify" element={<CodeAuth />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/setup-mfa" element={<Qrimg />} />

      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/devices" element={<IoTPage />} />
        <Route path="/monitoring" element={<p>Monitoring</p>} />
        <Route path="/alerts" element={<AlertPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/report" element={<p>Report</p>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/zones" element={<ZoneManagementPage />} />

      </Route>
    </Routes>
  )

}
export default App
