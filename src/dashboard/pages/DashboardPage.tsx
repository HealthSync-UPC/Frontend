import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WifiIcon from '@mui/icons-material/Wifi';
import dayjs from "dayjs";
import { useGlobalStore } from "../../shared/stores/globalstore";
import { DashboardCard } from "../components/DashboardCard";
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export function DashboardPage() {
    const { devices, alerts, items, profiles } = useGlobalStore();
    const onlineDevicesCount = devices.filter(d => d.status === 'ONLINE').length;
    const onlineDevicesPercentage = devices.length > 0 ? (onlineDevicesCount / devices.length) * 100 : 0;
    const itemsExpiringSoonCount = items.filter(item => {
        const today = dayjs();
        const expiryDate = dayjs(item.expirationDate);
        return expiryDate.isAfter(today) && expiryDate.isBefore(today.add(30, 'day'));
    }).length;

    // helper: latest alert (most recent)
    const latestAlert = alerts && alerts.length > 0
        ? [...alerts].sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())[0]
        : null;

    // helper: soonest expiring item
    const soonestItem = items && items.length > 0
        ? [...items].filter(it => it.expirationDate).sort((a, b) => new Date(a.expirationDate!).getTime() - new Date(b.expirationDate!).getTime())[0]
        : null;

    // helper: recent profiles (last 3)
    const recentProfiles = profiles ? [...profiles].slice(-3).reverse() : [];

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
                        <div className="mt-2">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={onlineDevicesPercentage}
                                    sx={{ height: 8, borderRadius: 4 }} />
                            </Box>
                            <div className="flex justify-between text-sm text-[#67737C] mt-1">
                                <span>Last check: {dayjs().format('MMM D')}</span>
                            </div>
                        </div>
                    }
                    variant="green"
                />

                <DashboardCard
                    title="Active Alerts"
                    icon={<WarningAmberIcon />}
                    value={alerts.length.toString()}
                    description=""
                    extraContent={
                        <div className="mt-2 text-sm text-[#67737C]">
                            {latestAlert ? (
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <WarningAmberIcon className="text-[#B45309]" />
                                        <span className="font-medium">{latestAlert.type.replace(/_/g, ' ')}</span>
                                    </div>
                                    <div className="text-xs mt-1">
                                        <span>{latestAlert.location}</span>
                                        <span className="mx-2">•</span>
                                        <span>{dayjs(latestAlert.registeredAt).format('MMM D, HH:mm')}</span>
                                    </div>
                                </div>
                            ) : (
                                <span>No active alerts</span>
                            )}
                        </div>
                    }
                    variant="yellow"
                />

                <DashboardCard
                    title="Items Expiring Soon"
                    icon={<Inventory2OutlinedIcon />}
                    value={itemsExpiringSoonCount.toString()}
                    description="Next 30 days"
                    extraContent={
                        <div className="mt-2 text-sm text-[#67737C]">
                            {soonestItem ? (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{soonestItem.name}</div>
                                        <div className="text-xs">Exp in {dayjs(soonestItem.expirationDate).diff(dayjs(), 'day')} days</div>
                                    </div>
                                    <div className="text-xs">Location: {soonestItem.location}</div>
                                </div>
                            ) : (
                                <span>No items expiring soon</span>
                            )}
                        </div>
                    }
                    variant="red"
                />

                <DashboardCard
                    title="Members"
                    icon={<PersonOutlineOutlinedIcon />}
                    value={profiles.length.toString()}
                    description=""
                    extraContent={
                        <div className="mt-2">
                            {recentProfiles.length > 0 ? (
                                <Stack direction="row" spacing={1}>
                                    {recentProfiles.map((p) => (
                                        <Avatar key={p.id}>{(p.firstName?.[0] || '') + (p.lastName?.[0] || '')}</Avatar>
                                    ))}
                                </Stack>
                            ) : (
                                <span className="text-sm text-[#67737C]">No members yet</span>
                            )}
                        </div>
                    }
                    variant="green"
                />
            </div>
        </div>
    );
}
