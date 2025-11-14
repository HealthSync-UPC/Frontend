import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import { AssignDevicesModal } from './AssignDevicesModal';
import { AssignItemsModal } from './AssignItemsModal';
import { AssignMembersModal } from './AssignMembersModal';



import { EditZoneModal } from './EditZoneModal';
import { ZoneDevicesTab } from './ZoneDevicesTab';
import { ZoneItemsTab } from './ZoneItemsTab';
import { ZoneMembersTab } from './ZoneMembersTab';
import { ZoneAccessLogsTab } from './ZoneAccessLogsTab';

type TabKey = 'devices' | 'items' | 'members' | 'access';

type ZoneDetailsModalProps = {
    open: boolean;
    zone: any;        // puedes tiparlo mejor si quieres
    onClose: () => void;
};

export function ZoneDetailsModal({ open, zone, onClose }: ZoneDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('devices');

    const [openAssignDevices, setOpenAssignDevices] = useState(false);
    const [openAssignItems, setOpenAssignItems] = useState(false);
    const [openAssignMembers, setOpenAssignMembers] = useState(false);
    const [openEditZone, setOpenEditZone] = useState(false);

    if (!open || !zone) return null;

    const TabButton = ({
        label,
        icon,
        isActive,
        onClick,
    }: {
        label: string;
        icon: React.ReactNode;
        isActive: boolean;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${isActive
                ? 'bg-[#E6F0FF] border-[#1E4288] text-[#1E4288]'
                : 'border-transparent text-gray-600 hover:bg-gray-100'
                }`}
        >
            {icon}
            {label}
        </button>
    );

    const handleEditSave = (data: { name: string; description: string }) => {
        // Mock: solo mostramos en consola
        console.log('Zone updated (mock): ', data);
        setOpenEditZone(false);
        // Si manejas las zonas desde un estado en el padre,
        // ahí es donde realmente deberías actualizar el nombre.
    };

    return (
        <>
            {/* Overlay del details */}
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

            {/* Card principal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl relative">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                        <CloseIcon />
                    </button>

                    {/* Header */}
                    <p className="text-xl font-semibold flex items-center gap-2">
                        <span role="img" aria-label="pin">
                            📍
                        </span>
                        {zone.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-5">
                        Zone ID: {zone.id} • View and manage zone details
                    </p>

                    {/* Tabs */}
                    <div className="flex items-center gap-3 border-b pb-3">
                        <TabButton
                            label={`Devices (${zone.devices.length})`}
                            icon={<SensorsOutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'devices'}
                            onClick={() => setActiveTab('devices')}
                        />
                        <TabButton
                            label={`Items (${zone.items.length})`}
                            icon={<Inventory2OutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'items'}
                            onClick={() => setActiveTab('items')}
                        />
                        <TabButton
                            label={`Members (${zone.members.length})`}
                            icon={<Groups2OutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'members'}
                            onClick={() => setActiveTab('members')}
                        />
                        <TabButton
                            label={`Access Logs (${zone.accessLogs.length})`}
                            icon={<ShieldOutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'access'}
                            onClick={() => setActiveTab('access')}
                        />
                    </div>

                    {/* Contenido */}
                    <div className="mt-4 max-h-[55vh] overflow-y-auto rounded-xl border border-gray-200">
                        {activeTab === 'devices' && <ZoneDevicesTab devices={zone.devices} />}
                        {activeTab === 'items' && <ZoneItemsTab items={zone.items} />}
                        {activeTab === 'members' && <ZoneMembersTab members={zone.members} />}
                        {activeTab === 'access' && <ZoneAccessLogsTab logs={zone.accessLogs} />}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
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
                            <button
                                onClick={() => setOpenAssignMembers(true)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Assign Members
                            </button>
                        )}

                        {activeTab === 'access' && (
                            <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Export Access Logs
                            </button>
                        )}

                        {/* Botones de acciones */}
                        <div className="ml-4 flex gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setOpenEditZone(true)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Edit
                            </button>
                            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modales secundarios */}
            <AssignDevicesModal
                open={openAssignDevices}
                zoneName={zone.name}
                initialSelectedIds={zone.devices.map((d: any) => d.id)}
                onClose={() => setOpenAssignDevices(false)}
            />

            <AssignItemsModal
                open={openAssignItems}
                zoneName={zone.name}
                initialSelectedCodes={zone.items.map((i: any) => i.code)}
                onClose={() => setOpenAssignItems(false)}
            />

            <AssignMembersModal
                open={openAssignMembers}
                zoneName={zone.name}
                initialSelectedIds={zone.members.map((m: any) => m.memberId)}
                onClose={() => setOpenAssignMembers(false)}
            />

            {/* Edit Zone */}
            <EditZoneModal
                open={openEditZone}
                initialName={zone.name}
                initialDescription={zone.description || ''}
                onClose={() => setOpenEditZone(false)}
                onSave={handleEditSave}
            />
        </>
    );
}
