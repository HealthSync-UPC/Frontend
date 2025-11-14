import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import type { ReactNode } from 'react';

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}>{children}</div>
);

const StatCard = ({
    title,
    value,
    subtitle,
    icon,
}: {
    title: string;
    value: number | string;
    subtitle: string;
    icon: ReactNode;
}) => (
    <Card>
        <div className="flex items-start justify-between">
            <p className="text-sm text-gray-600">{title}</p>
            <div className="text-gray-400">{icon}</div>
        </div>
        <p className="mt-3 text-3xl font-semibold">{value}</p>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </Card>
);

type Props = {
    totalZones: number;
    totalMembers: number;
    devices: number;
    items: number;
};

export function ZoneStats({ totalZones, totalMembers, devices, items }: Props) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Zones"
                value={totalZones}
                subtitle="Active zones"
                icon={<PlaceOutlinedIcon />}
            />
            <StatCard
                title="Total Members"
                value={totalMembers}
                subtitle="Authorized members"
                icon={<Groups2OutlinedIcon />}
            />
            <StatCard
                title="Devices"
                value={devices}
                subtitle="Assigned devices"
                icon={<MemoryOutlinedIcon />}
            />
            <StatCard
                title="Items"
                value={items}
                subtitle="Tracked items"
                icon={<Inventory2OutlinedIcon />}
            />
        </div>
    );
}
