import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import { ZoneDevicesTab } from './ZoneDevicesTab';
import { ZoneItemsTab } from './ZoneItemsTab';
import { ZoneMembersTab } from './ZoneMembersTab';
import { ZoneAccessLogsTab } from './ZoneAccessLogsTab';
import { AssignDevicesModal } from './AssignDevicesModal';
import { AssignItemsModal } from './AssignItemsModal';

export type ZoneDevice = {
    name: string;
    serial: string;
    type: string;
    location: string;
    latestReading: string;
    status: 'active' | 'inactive';
};

export type ZoneItem = {
    code: string;
    name: string;
    quantity: number;
    unit: string;
    status: 'Enabled' | 'Disabled';
};

export type ZoneMember = {
    initials: string;
    name: string;
    role: string;
    memberId: number;
};

export type ZoneAccessLog = {
    user: string;
    timestamp: string;
    status: 'granted' | 'denied';
};

export type ZoneDetails = {
    id: number;
    name: string;
    devices: ZoneDevice[];
    items: ZoneItem[];
    members: ZoneMember[];
    accessLogs: ZoneAccessLog[];
};

type Props = {
    open: boolean;
    zone: ZoneDetails | null;
    onClose: () => void;
};

type TabKey = 'devices' | 'items' | 'members' | 'access';

export function ZoneDetailsModal({ open, zone, onClose }: Props) {
    const [activeTab, setActiveTab] = useState<TabKey>('devices');

    const [openAssignDevices, setOpenAssignDevices] = useState(false);
    const [openAssignItems, setOpenAssignItems] = useState(false);

    if (!open || !zone) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const TabButton = ({
        label,
        icon,
        active,
        onClick,
    }: {
        label: string;
        icon: React.ReactNode;
        active: boolean;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className={
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ' +
                (active ? 'bg-white shadow-sm' : 'text-gray-600')
            }
        >
            {icon}
            {label}
        </button>
    );

    return (
        <>
            {/* MODAL PRINCIPAL */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                onClick={handleBackdropClick}
            >
                <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <CloseIcon fontSize="small" />
                    </button>

                    {/* Header */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1">
                            <PlaceOutlinedIcon />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{zone.name}</h2>
                            <p className="text-sm text-gray-600">
                                Zone ID: {zone.id} • View and manage zone details
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-4 flex gap-2 rounded-full bg-gray-100 px-2 py-1">
                        <TabButton
                            label={`Devices (${zone.devices.length})`}
                            icon={<SettingsInputComponentIcon fontSize="small" />}
                            active={activeTab === 'devices'}
                            onClick={() => setActiveTab('devices')}
                        />
                        <TabButton
                            label={`Items (${zone.items.length})`}
                            icon={<Inventory2OutlinedIcon fontSize="small" />}
                            active={activeTab === 'items'}
                            onClick={() => setActiveTab('items')}
                        />
                        <TabButton
                            label={`Members (${zone.members.length})`}
                            icon={<Groups2OutlinedIcon fontSize="small" />}
                            active={activeTab === 'members'}
                            onClick={() => setActiveTab('members')}
                        />
                        <TabButton
                            label={`Access Logs (${zone.accessLogs.length})`}
                            icon={<ShieldOutlinedIcon fontSize="small" />}
                            active={activeTab === 'access'}
                            onClick={() => setActiveTab('access')}
                        />
                    </div>

                    {/* Content */}
                    <div className="mt-4 max-h-[55vh] overflow-y-auto rounded-xl border border-gray-200">
                        {activeTab === 'devices' && <ZoneDevicesTab devices={zone.devices} />}
                        {activeTab === 'items' && <ZoneItemsTab items={zone.items} />}
                        {activeTab === 'members' && <ZoneMembersTab members={zone.members} />}
                        {activeTab === 'access' && <ZoneAccessLogsTab logs={zone.accessLogs} />}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex justify-between border-t pt-4">
                        {/* Botón principal según tab */}
                        {activeTab === 'devices' && (
                            <button
                                onClick={() => setOpenAssignDevices(true)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Assign Devices
                            </button>
                        )}

                        {activeTab === 'items' && (
                            <button
                                onClick={() => setOpenAssignItems(true)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Assign Items
                            </button>
                        )}

                        {activeTab === 'members' && (
                            <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Assign Members
                            </button>
                        )}

                        {activeTab === 'access' && (
                            <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Export Access Logs
                            </button>
                        )}

                        <div className="ml-4 flex gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Edit
                            </button>
                            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL ASSIGN DEVICES */}
            <AssignDevicesModal
                open={openAssignDevices}
                zoneName={zone.name}
                initialSelectedIds={zone.devices.map((d) => d.serial)} // usamos serial como id
                onClose={() => setOpenAssignDevices(false)}
            />

            {/* MODAL ASSIGN ITEMS */}
            <AssignItemsModal
                open={openAssignItems}
                zoneName={zone.name}
                initialSelectedCodes={zone.items.map((i) => i.code)}
                onClose={() => setOpenAssignItems(false)}
            />
        </>
    );
}
