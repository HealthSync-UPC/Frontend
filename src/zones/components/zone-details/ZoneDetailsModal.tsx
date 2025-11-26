import CloseIcon from '@mui/icons-material/Close';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { AssignDevicesModal } from './add-modals/AssignDevicesModal';
import { AssignItemsModal } from './add-modals/AssignItemsModal';
import { AssignMembersModal } from './add-modals/AssignMembersModal';
/* import { EditZoneModal } from './add-modals/EditZoneModal'; */
import { ZoneAccessLogsTab } from './ZoneAccessLogsTab';
import { ZoneDevicesTab } from './ZoneDevicesTab';
import { ZoneItemsTab } from './ZoneItemsTab';
import { ZoneMembersTab } from './ZoneMembersTab';
import { useZoneStore } from '../../stores/zone-store';

type TabKey = 'devices' | 'items' | 'members' | 'access';

type ZoneDetailsModalProps = {
    open: boolean;
    onClose: () => void;
};

export function ZoneDetailsModal({ open, onClose }: ZoneDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('devices');
    const [openAssignDevices, setOpenAssignDevices] = useState(false);
    const [openAssignItems, setOpenAssignItems] = useState(false);
    const [openAssignMembers, setOpenAssignMembers] = useState(false);
    /* const [openEditZone, setOpenEditZone] = useState(false); */
    const { selectedZone } = useZoneStore();

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

    return (
        <>
            <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
                <div className="relative max-h-[90vh] w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                        <CloseIcon />
                    </button>

                    <p className="text-xl font-semibold flex items-center gap-2">
                        {selectedZone?.name}
                    </p>
                    <p className="text-sm text-gray-500 mb-5">
                        Zone ID: {selectedZone?.id} • View and manage zone details
                    </p>

                    <div className="flex items-center gap-3 border-b pb-3">
                        <TabButton
                            label={`Devices (${selectedZone?.devices.length})`}
                            icon={<SensorsOutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'devices'}
                            onClick={() => setActiveTab('devices')}
                        />
                        <TabButton
                            label={`Items (${selectedZone?.items.length})`}
                            icon={<Inventory2OutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'items'}
                            onClick={() => setActiveTab('items')}
                        />
                        <TabButton
                            label={`Members (${selectedZone?.members.length})`}
                            icon={<Groups2OutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'members'}
                            onClick={() => setActiveTab('members')}
                        />
                        <TabButton
                            label={`Access Logs (${selectedZone?.accessLogs.length})`}
                            icon={<ShieldOutlinedIcon fontSize="small" />}
                            isActive={activeTab === 'access'}
                            onClick={() => setActiveTab('access')}
                        />
                    </div>

                    <div className="mt-4 max-h-[55vh] overflow-y-auto rounded-xl border border-gray-200">
                        {activeTab === 'devices' && <ZoneDevicesTab />}
                        {activeTab === 'items' && <ZoneItemsTab />}
                        {activeTab === 'members' && <ZoneMembersTab />}
                        {activeTab === 'access' && <ZoneAccessLogsTab />}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
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

                        <div className="ml-4 flex gap-3">
                            <button
                                onClick={onClose}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Close
                            </button>
                            {/*   <button
                                onClick={() => setOpenEditZone(true)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Edit
                            </button> */}
                            <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            <AssignDevicesModal open={openAssignDevices} onClose={() => setOpenAssignDevices(false)} />
            <AssignItemsModal open={openAssignItems} onClose={() => setOpenAssignItems(false)} />
            <AssignMembersModal open={openAssignMembers} onClose={() => setOpenAssignMembers(false)} />
            {/* 
            <EditZoneModal open={openEditZone} onClose={() => setOpenEditZone(false)} onSave={handleEditSave} /> 
            */}
        </>
    );
}
