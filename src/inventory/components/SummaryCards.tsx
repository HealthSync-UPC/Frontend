import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { useGlobalStore } from '../../shared/stores/globalstore';
import dayjs from 'dayjs';

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

export function SummaryCards() {
    const { items } = useGlobalStore();

    const expiringIn30 = items.filter(item => {
        if (!item.expirationDate) return false;
        const diff = dayjs(item.expirationDate).diff(dayjs(), 'day');
        return diff > 0 && diff <= 30;
    }).length;

    const expiringIn7 = items.filter(item => {
        if (!item.expirationDate) return false;
        const diff = dayjs(item.expirationDate).diff(dayjs(), 'day');
        return diff > 0 && diff <= 7;
    }).length;

    const expired = items.filter(item => {
        if (!item.expirationDate) return false;
        const diff = dayjs(item.expirationDate).diff(dayjs(), 'day');
        return diff < 0;
    }).length;


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
                title="Total Items"
                count={items.length}
                subtitle="Across all locations"
                icon={<Inventory2OutlinedIcon />}
                bgColor="bg-white"
                borderColor="border-gray-200"
            />
            <InfoCard
                title="Expiring in 30 days"
                count={expiringIn30}
                subtitle="Requires attention"
                icon={<CalendarMonthOutlinedIcon />}
                bgColor="bg-[#FFF9E6]"
                borderColor="border-[#FFE9A0]"
            />
            <InfoCard
                title="Expiring in 7 days"
                count={expiringIn7}
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
