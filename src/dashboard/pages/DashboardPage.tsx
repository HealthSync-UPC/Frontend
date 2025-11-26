import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonIcon from '@mui/icons-material/Person';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WifiIcon from '@mui/icons-material/Wifi';
import dayjs from "dayjs";
import { useGlobalStore } from "../../shared/stores/globalstore";
import { DashboardCard } from "../components/DashboardCard";

export function DashboardPage() {
    const { devices, alerts, items, profiles } = useGlobalStore();
    const onlineDevicesCount = devices.filter(d => d.status === 'ONLINE').length;
    const onlineDevicesPercentage = devices.length > 0 ? (onlineDevicesCount / devices.length) * 100 : 0;
    const itemsExpiringSoonCount = items.filter(item => {
        const today = dayjs();
        const expiryDate = dayjs(item.expirationDate);
        return expiryDate.isAfter(today) && expiryDate.isBefore(today.add(30, 'day'));
    }).length;


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
                    value={`${onlineDevicesCount} / ${devices.length}`}
                    description={`${onlineDevicesPercentage.toFixed(0)}% operational`}
                    extraContent={
                        <></>
                        /*  <div className="flex gap-2 text-[#67737C]">
                             <HorizontalRuleIcon />
                             <span>0% vs last period</span>
                         </div> */
                    }
                    variant="green"
                />

                <DashboardCard
                    title="Active Alerts"
                    icon={<WarningAmberIcon />}
                    value={alerts.length.toString()}
                    description=""
                    extraContent={
                        <></>
                        /*    <div className="flex gap-2">
                               <div className="text-[#00A63E] flex gap-1">
                                   <TrendingUpIcon />
                                   <span>+2</span>
                               </div>
                               <span className="text-[#67737C]">vs last period</span>
                           </div> */
                    }
                    variant="yellow"
                />

                <DashboardCard
                    title="Items Expiring Soon"
                    icon={<Inventory2OutlinedIcon />}
                    value={itemsExpiringSoonCount.toString()}
                    description="Next 30 days"
                    extraContent={
                        <></>
                        /* <div className="flex gap-2">
                            <div className="text-[#E7000B] flex gap-1">
                                <TrendingDownIcon />
                                <span>-5</span>
                            </div>
                            <span className="text-[#67737C]">vs last period</span>
                        </div> */
                    }
                    variant="red"
                />

                <DashboardCard
                    title="Members"
                    icon={<PersonIcon />}
                    value={profiles.length.toString()}
                    description=""
                    extraContent={
                        <></>
                        /* <div className="flex gap-2">
                            <div className="text-[#00A63E] flex gap-1">
                                <TrendingUpIcon />
                                <span>+1</span>
                            </div>
                            <span className="text-[#67737C]">vs last period</span>
                        </div> */
                    }
                    variant="green"
                />
            </div>
        </div>
    );
}
