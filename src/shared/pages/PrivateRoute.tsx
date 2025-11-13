import { Navigate } from "react-router";
import { MainLayout } from "./MainLayout";
import { isTokenValid } from "../utils/jwt-decode";

export function PrivateRoute() {
    const token = localStorage.getItem("token");

    return isTokenValid(token) ? <MainLayout /> : <Navigate to="/login" replace />;
}