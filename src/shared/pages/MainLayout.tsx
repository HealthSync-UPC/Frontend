import { Outlet, useNavigate, useLocation } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MemoryIcon from "@mui/icons-material/Memory";
/* import ShowChartIcon from "@mui/icons-material/ShowChart"; */
import WarningIcon from "@mui/icons-material/Warning";
import InventoryIcon from "@mui/icons-material/Inventory";
/* import ArticleIcon from "@mui/icons-material/Article"; */
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect } from "react";
import { useGlobalStore } from "../stores/globalstore";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';

export function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { getDevices, getCategories, getItems, getZones, getProfiles, getAlerts } = useGlobalStore();
    const { setJwt } = useGlobalStore();

    const menuItems = [
        { icon: <DashboardIcon />, label: "Dashboard", path: "/dashboard" },
        { icon: <MemoryIcon />, label: "IoT Devices", path: "/devices" },
        /* { icon: <ShowChartIcon />, label: "Monitoring", path: "/monitoring" }, */
        { icon: <WarningIcon />, label: "Alerts", path: "/alerts" },
        { icon: <InventoryIcon />, label: "Inventory", path: "/inventory" },
        /* { icon: <ArticleIcon />, label: "Report", path: "/report" }, */
        { icon: <LocationOnIcon />, label: "Zones", path: "/zones" }
    ];

    const bottomItems = [
        { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
    ];

    useEffect(() => {
        getDevices();
        getCategories();
        getItems();
        getProfiles();
        getZones();
        getAlerts();
    }, [])

    return (
        <div className="flex flex-col w-full h-screen">
            {/* Header */}
            <div className="flex gap-5 items-center bg-[#F9FCFF] p-4 border-b-1 border-[#dfe6eb]">
                <img src="/logo.png" alt="Logo" className="w-10 h-auto" />
                <h1 className="font-semibold text-3xl">MediTrack</h1>
            </div>

            {/* Body */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-[14%] bg-[#F9FCFF] flex flex-col justify-between text-[#040C13] font-medium p-4 border-r border-[#dfe6eb]">
                    {/* Top menu */}
                    <div className="flex flex-col gap-3">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center gap-4 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer
                                        ${isActive
                                            ? "bg-[#DFE6EB]"
                                            : "hover:bg-[#EDF2F5]"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Bottom menu */}
                    <div className="flex flex-col gap-3">
                        {bottomItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center gap-4 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer
                                        ${isActive
                                            ? "bg-[#DFE6EB]"
                                            : "hover:bg-[#EDF2F5]"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                setJwt("");
                                navigate("/login");
                            }}
                            className="flex items-center gap-4 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer hover:bg-[#EDF2F5]"
                        >
                            <LogoutIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 bg-white p-6 overflow-auto mx-20 mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}


