import { Navigate, Route, Routes } from "react-router"

import { CodeAuth } from "./iam/components/CodeAuth"
import { LoginForm } from "./iam/components/LoginForm"
import { Qrimg } from "./iam/components/Qrimg"
import { RegisterForm } from "./iam/components/RegisterForm"
import AuthPages from "./iam/pages/AuthPages"
import { PrivateRoute } from "./shared/pages/PrivateRoute"

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

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<p>Dashboard</p>} />
        <Route path="/settings" element={<p>Settings</p>} />
      </Route>

    </Routes>
  )

}
export default App
