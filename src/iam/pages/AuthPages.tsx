import { Outlet } from "react-router";

export default function AuthPages() {
    //<></>
    return (
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