import { Navigate, Outlet } from "react-router";
import { isTokenValid } from "../../shared/utils/jwt-decode";

export default function AuthPages() {
    const token = localStorage.getItem("token");

    return (
        isTokenValid(token) ?
            <Navigate to="/dashboard" /> :
            <div className="flex items-center flex-col">
                <div className="flex flex-col items-center gap-1 my-5">
                    <img src="/logo.png" alt="AuthPages" className="w-15" />
                    <span className="text-xl font-bold">MediTrack</span>
                    <span className="text-md text-[#67737C]">Medical Monitoring Platform</span>
                </div>
                <Outlet />

                <span className="text-sm text-[#67737C] my-5" >© 2025 MediTrack. Compliant with GDP guidelines.</span>
            </div>
    )
}