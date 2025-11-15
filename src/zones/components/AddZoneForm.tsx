import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type TabKey = 'devices' | 'items' | 'members';

type Option = {
    id: string;
    title: string;
    subtitle: string;
};

type Props = {
    onCancel: () => void;
};

const DEVICES: Option[] = [
    { id: 'dev-1', title: 'Temperature Sensor A1', subtitle: 'Available' },
    { id: 'dev-2', title: 'Humidity Monitor H1', subtitle: 'Available' },
    { id: 'dev-3', title: 'Door Sensor D1', subtitle: 'Available' },
    { id: 'dev-4', title: 'Pressure Monitor P1', subtitle: 'Available' },
];

const ITEMS: Option[] = [
    { id: 'itm-1', title: 'Insulin Vial 10ml', subtitle: 'MED-001' },
    { id: 'itm-2', title: 'COVID-19 Vaccine', subtitle: 'VAC-001' },
    { id: 'itm-3', title: 'Blood Type O+', subtitle: 'BLD-001' },
    { id: 'itm-4', title: 'IV Fluids 0.9%', subtitle: 'IVF-002' },
];

const MEMBERS: Option[] = [
    { id: 'mem-1', title: 'Dr. Sarah Johnson', subtitle: 'Doctor' },
    { id: 'mem-2', title: 'Pharmacist Mike Chen', subtitle: 'Pharmacist' },
    { id: 'mem-3', title: 'Nurse Emily Rodriguez', subtitle: 'Nurse' },
    { id: 'mem-4', title: 'Lab Tech John Smith', subtitle: 'Lab Technician' },
];

export function AddZoneForm({ onCancel }: Props) {
    const [zoneName, setZoneName] = useState('');
    const [tab, setTab] = useState<TabKey>('devices');

    const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const toggle = (id: string, list: string[], setter: (v: string[]) => void) => {
        setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
    };

    const handleAdd = () => {
        console.log('New zone (mock):', {
            zoneName,
            devices: selectedDevices,
            items: selectedItems,
            members: selectedMembers,
        });
        alert('Zone created ');
        onCancel();
    };

    const devicesCount = selectedDevices.length;
    const itemsCount = selectedItems.length;
    const membersCount = selectedMembers.length;

    let options: Option[] = [];
    let selectedList: string[] = [];
    let setter: (v: string[]) => void = () => { };

    if (tab === 'devices') {
        options = DEVICES;
        selectedList = selectedDevices;
        setter = setSelectedDevices;
    } else if (tab === 'items') {
        options = ITEMS;
        selectedList = selectedItems;
        setter = setSelectedItems;
    } else {
        options = MEMBERS;
        selectedList = selectedMembers;
        setter = setSelectedMembers;
    }

    const TabButton = ({
        label,
        active,
        onClick,
    }: {
        label: string;
        active: boolean;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className={
                'flex-1 rounded-full py-2 text-sm font-medium transition-colors ' +
                (active ? 'bg-white shadow-sm' : 'text-gray-600')
            }
        >
            {label}
        </button>
    );

    return (
        <div className="relative max-h-[90vh] w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <button
                onClick={onCancel}
                className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
                <CloseIcon fontSize="small" />
            </button>

            <h2 className="text-xl font-semibold">Add Zone</h2>
            <p className="mt-1 text-sm text-gray-600">
                Create a new zone and assign devices, items, and members
            </p>

            <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">Zone Name</label>
                <input
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                    placeholder="e.g., Pharmacy Cold Storage"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
                />
            </div>

            <div className="mt-4 flex gap-1 rounded-full bg-gray-100 p-1">
                <TabButton
                    label={`Devices (${devicesCount})`}
                    active={tab === 'devices'}
                    onClick={() => setTab('devices')}
                />
                <TabButton
                    label={`Items (${itemsCount})`}
                    active={tab === 'items'}
                    onClick={() => setTab('items')}
                />
                <TabButton
                    label={`Members (${membersCount})`}
                    active={tab === 'members'}
                    onClick={() => setTab('members')}
                />
            </div>

            <div className="mt-4 max-h-[330px] overflow-y-auto rounded-xl border border-gray-200">
                {options.map((opt) => {
                    const checked = selectedList.includes(opt.id);
                    return (
                        <label
                            key={opt.id}
                            className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0"
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggle(opt.id, selectedList, setter)}
                                className="h-4 w-4 rounded border-gray-400"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{opt.title}</p>
                                <p className="text-xs text-gray-500">{opt.subtitle}</p>
                            </div>
                        </label>
                    );
                })}
            </div>

            <div className="mt-5 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAdd}
                    className="rounded-md bg-[#1E4288] px-4 py-2 text-sm font-medium text-white hover:bg-[#163568]"
                >
                    Add Zone
                </button>
            </div>
        </div>
    );
}
