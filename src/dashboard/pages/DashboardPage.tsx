import { DashboardCard } from "../components/DashboardCard";
import WifiIcon from '@mui/icons-material/Wifi';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

export function DashboardPage() {
    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">Medical Monitoring Dashboard</p>
                    <p className="text-lg text-[#67737C]">
                        Monitor your medical storage conditions and inventory in real-time
                    </p>
                </div>
                <button className="bg-[#00648E] text-white py-2 px-8 rounded-md hover:bg-[#005273] transition-colors">
                    Generate Report
                </button>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <DashboardCard
                    title="Devices Online"
                    icon={<WifiIcon />}
                    value="47/50"
                    description="94% operational"
                    extraContent={
                        <div className="flex gap-2 text-[#67737C]">
                            <HorizontalRuleIcon />
                            <span>0% vs last period</span>
                        </div>
                    }
                    variant="green"
                />

                <DashboardCard
                    title="Active Alerts"
                    icon={<WarningAmberIcon />}
                    value="12"
                    description="3 critical, 9 warnings"
                    extraContent={
                        <div className="flex gap-2">
                            <div className="text-[#00A63E] flex gap-1">
                                <TrendingUpIcon />
                                <span>+2</span>
                            </div>
                            <span className="text-[#67737C]">vs last period</span>
                        </div>
                    }
                    variant="yellow"
                />

                <DashboardCard
                    title="Items Expiring Soon"
                    icon={<Inventory2OutlinedIcon />}
                    value="28"
                    description="Next 30 days"
                    extraContent={
                        <div className="flex gap-2">
                            <div className="text-[#E7000B] flex gap-1">
                                <TrendingDownIcon />
                                <span>-5</span>
                            </div>
                            <span className="text-[#67737C]">vs last period</span>
                        </div>
                    }
                    variant="yellow"
                />

                <DashboardCard
                    title="Temperature Excursions (24h)"
                    icon={<DeviceThermostatIcon />}
                    value="3"
                    description="Last 24 hours"
                    extraContent={
                        <div className="flex gap-2">
                            <div className="text-[#00A63E] flex gap-1">
                                <TrendingUpIcon />
                                <span>+1</span>
                            </div>
                            <span className="text-[#67737C]">vs last period</span>
                        </div>
                    }
                    variant="red"
                />
            </div>
        </div>
    );
}
