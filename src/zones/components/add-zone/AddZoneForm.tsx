import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalStore } from '../../../shared/stores/globalstore';
import type { Item } from '../../../inventory/model/item';
import type { Iot } from '../../../iot/model/iot';
import type { User } from '../../../settings/model/User';
import { Zone } from '../../model/zone';
import { Member } from '../../model/member';

type TabKey = 'nfc' | 'devices' | 'items' | 'members';

type Props = {
    onCancel: () => void;
    onSetMessage: (msg: string) => void;
    onSetOpenSnackBar: (open: boolean) => void;
};

export function AddZoneForm({ onCancel, onSetMessage, onSetOpenSnackBar }: Props) {
    const { devices, items, profiles, addZone, getZones, getDevices, getItems } = useGlobalStore();
    const [zoneName, setZoneName] = useState('');
    const [tab, setTab] = useState<TabKey>('nfc');
    const [selectedNFC, setSelectedNFC] = useState<number | null>(null);
    const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    const toggle = (id: number, list: number[], setter: (v: number[]) => void) => {
        setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
    };

    const handleAdd = async () => {
        const devicesToAdd = devices.filter(d => selectedDevices.includes(d.id) || d.id === selectedNFC);
        const itemsToAdd = items.filter(i => selectedItems.includes(i.id));
        const membersToAdd = profiles.filter(p => selectedMembers.includes(p.id))
            .map(p => new Member(p.id, p.firstName + ' ' + p.lastName));

        const newZone: Pick<Zone, 'name' | 'devices' | 'items' | 'members'> = {
            name: zoneName,
            devices: devicesToAdd,
            items: itemsToAdd,
            members: membersToAdd
        }

        if (!zoneName.trim()) {
            onSetMessage('Zone name is required');
            onSetOpenSnackBar(true);
            return;
        }

        if (selectedNFC === null) {
            onSetMessage('Please select an NFC device');
            onSetOpenSnackBar(true);
            return;
        }

        await addZone(newZone as Zone);
        onSetMessage('Zone added successfully');
        onSetOpenSnackBar(true);

        await getZones();
        await getDevices();
        await getItems();

        onCancel();
    };

    const devicesCount = selectedDevices.length;
    const itemsCount = selectedItems.length;
    const membersCount = selectedMembers.length;

    let options: Iot[] | Item[] | User[] = [];
    let selectedList: number[] = [];
    let setterArray: (v: number[]) => void = () => { };
    let setterSingle: (v: number | null) => void = () => { };


    if (tab === 'nfc') {
        options = devices.filter(d => d.type === 'ACCESS_NFC');
        selectedList = selectedNFC !== null ? [selectedNFC] : [];
        setterSingle = setSelectedNFC;
    } else if (tab === 'devices') {
        options = devices.filter(d => d.type !== 'ACCESS_NFC');
        selectedList = selectedDevices;
        setterArray = setSelectedDevices;
    } else if (tab === 'items') {
        options = items;
        selectedList = selectedItems;
        setterArray = setSelectedItems;
    } else {
        options = profiles;
        selectedList = selectedMembers;
        setterArray = setSelectedMembers;
    }


    const TabButton = ({
        label,
        active,
        onClick
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
            <p className="mt-1 text-sm text-gray-600">Create a new zone and assign devices, items, and members</p>

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
                <TabButton label="NFC" active={tab === 'nfc'} onClick={() => setTab('nfc')} />
                <TabButton label={`Devices (${devicesCount})`} active={tab === 'devices'} onClick={() => setTab('devices')} />
                <TabButton label={`Items (${itemsCount})`} active={tab === 'items'} onClick={() => setTab('items')} />
                <TabButton label={`Members (${membersCount})`} active={tab === 'members'} onClick={() => setTab('members')} />
            </div>

            <div className="mt-4 max-h-[330px] overflow-y-auto rounded-xl border border-gray-200 bg-white">
                {options.map((opt: Iot | Item | User) => {
                    const checked = selectedList.includes(opt.id);

                    const hasLocation = "location" in opt;
                    const disabled = hasLocation && opt.location !== "Unassigned";

                    return (
                        <label
                            key={opt.id}
                            className={`flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={() => {
                                    if (tab === "nfc") {
                                        setterSingle(checked ? null : opt.id);
                                    } else {
                                        toggle(opt.id, selectedList, setterArray);
                                    }
                                }}
                                className="h-4 w-4 rounded border-gray-400"
                            />

                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {"firstName" in opt
                                        ? `${opt.firstName} ${opt.lastName}`
                                        : opt.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {"position" in opt
                                        ? opt.position
                                        : "serialNumber" in opt
                                            ? opt.serialNumber
                                            : "code" in opt
                                                ? opt.code
                                                : ""}
                                </p>

                                {hasLocation && (
                                    <p className="text-[11px] text-gray-600">
                                        {opt.location != "Unassigned" ?
                                            `Assigned to ${opt.location}`
                                            : opt.location}
                                    </p>
                                )}
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
