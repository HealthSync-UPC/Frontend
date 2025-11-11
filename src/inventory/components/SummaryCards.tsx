import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import { SectionCard } from './ui';

import { daysUntil } from './ui';
import type { InventoryItem } from '../model/types';

type CardProps = {
    title: string;
    count: number;
    subtitle: string;
    icon: React.ReactNode;
    bgColor?: string;
    borderColor?: string;
};

const InfoCard = ({
    title,
    count,
    subtitle,
    icon,
    bgColor = 'bg-white',
    borderColor = 'border-gray-200',
}: CardProps) => (
    <div
        className={`flex flex-col justify-between rounded-xl border ${borderColor} ${bgColor} p-5 shadow-sm transition`}
    >
        <div className="flex justify-between items-start mb-2">
            <p className="text-base font-medium">{title}</p>
            <div className="text-gray-400">{icon}</div>
        </div>
        <p className="text-3xl font-semibold">{count}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
);

export function SummaryCards({ items }: { items: InventoryItem[] }) {
    const now = new Date();

    const total = items.length;
    const exp30 = items.filter((i) => {
        const d = daysUntil(i.expiryDate);
        return d > 0 && d <= 30;
    }).length;
    const exp7 = items.filter((i) => {
        const d = daysUntil(i.expiryDate);
        return d > 0 && d <= 7;
    }).length;
    const expired = items.filter((i) => new Date(i.expiryDate) < now).length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
                title="Total Items"
                count={total}
                subtitle="Across all locations"
                icon={<Inventory2OutlinedIcon />}
                bgColor="bg-white"
                borderColor="border-gray-200"
            />
            <InfoCard
                title="Expiring in 30 days"
                count={exp30}
                subtitle="Requires attention"
                icon={<CalendarMonthOutlinedIcon />}
                bgColor="bg-[#FFF9E6]"
                borderColor="border-[#FFE9A0]"
            />
            <InfoCard
                title="Expiring in 7 days"
                count={exp7}
                subtitle="Urgent action needed"
                icon={<WarningAmberOutlinedIcon />}
                bgColor="bg-[#FFEAEA]"
                borderColor="border-[#FFD1D1]"
            />
            <InfoCard
                title="Expired Items"
                count={expired}
                subtitle="Remove from inventory"
                icon={<EventBusyOutlinedIcon />}
                bgColor="bg-[#FFEAEA]"
                borderColor="border-[#FFD1D1]"
            />
        </div>
    );
}
