
import GroupIcon from '@mui/icons-material/Group';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
export type TabKey = 'thresholds' | 'users';

export function Navbar({
    active,
    onChange,
}: {
    active: TabKey;
    onChange: (t: TabKey) => void;
}) {
    const TabButton = ({
        label,
        isActive,
        onClick,
        Icon
    }: {
        label: string;
        isActive: boolean;
        onClick: () => void;
        Icon?: React.ElementType;
    }) => (
        <button
            onClick={onClick}
            className={[
                'px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors',
                isActive ? 'bg-[#E6F2F7] text-[#00648E]' : 'text-[#4B5563] hover:text-[#00648E] hover:bg-gray-100',
            ].join(' ')}
        >
            {Icon && <Icon className="inline mr-2 mb-1" fontSize="small" />}

            {label}
        </button>
    );

    return (
        <div className="flex gap-2 rounded-xl bg-[#F5F7F9] p-2">
            <TabButton label="Thresholds" isActive={active === 'thresholds'} onClick={() => onChange('thresholds')} Icon={SettingsInputComponentIcon} />
            <TabButton label="Users" isActive={active === 'users'} onClick={() => onChange('users')} Icon={GroupIcon} />
        </div>
    );
}
