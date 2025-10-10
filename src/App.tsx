import { Navigate, Route, Routes } from "react-router"

import AuthPages from "./iam/pages/AuthPages"
import { RegisterForm } from "./iam/components/RegisterForm"
import { Qrimg } from "./iam/components/Qrimg"
import { CodeAuth } from "./iam/components/CodeAuth"
import { LoginForm } from "./iam/components/LoginForm"

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
    </Routes>
  )

}
export default App
