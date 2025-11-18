import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useZoneStore } from '../../../stores/zone-store';
import { Modal } from '@mui/material';
import { useGlobalStore } from '../../../../shared/stores/globalstore';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssignDevicesModal({ open, onClose, }: Props) {
    const [query, setQuery] = useState('');
    const { devices, addIotToZone, removeIotFromZone, getDevices } = useGlobalStore();
    const { selectedZone, setSelectedZone, getZoneById } = useZoneStore();
    const [original, setOriginal] = useState<number[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        const assignedItemsIds = devices.filter(d =>
            selectedZone?.devices.some(dz => dz.id === d.id)
        ).map(d => d.id);

        setOriginal(assignedItemsIds);
        setSelected(assignedItemsIds);
    }, [open]);

    const toggle = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearAll = () => setSelected([]);

    const handleSave = async () => {
        const added = selected.filter(x => !original.includes(x));
        const removed = original.filter(x => !selected.includes(x));

        if (added.length > 0) {
            for (const deviceId of added) {
                const device = devices.find(d => d.id === deviceId);

                if (device) {
                    await addIotToZone(selectedZone!, device);
                }
            }
        }

        if (removed.length > 0) {
            for (const deviceId of removed) {
                const device = devices.find(d => d.id === deviceId);

                if (device) {
                    await removeIotFromZone(selectedZone!, device);
                }
            }
        }

        const updatedZone = await getZoneById(selectedZone!.id);
        setSelectedZone(updatedZone);
        await getDevices();
        onClose();
    };

    const filteredDevices = devices.filter(d => d.type !== 'ACCESS_NFC').filter((d) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
            d.name.toLowerCase().includes(q) ||
            d.serialNumber.toLowerCase().includes(q) ||
            d.type.toLowerCase().includes(q)
        );
    });

    return (
        <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
            <div className="relative max-h-[90vh] w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                    <CloseIcon fontSize="small" />
                </button>

                {/* Header */}
                <h2 className="text-xl font-semibold">Assign Devices</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Assign IoT devices to <span className="font-medium">{selectedZone?.name}</span>
                </p>

                {/* Search */}
                <div className="mt-4">
                    <div className="relative">
                        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search devices..."
                            className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm"
                        />
                    </div>
                </div>

                {/* Lista de devices */}
                <div className="mt-4 max-h-[340px] overflow-y-auto rounded-xl border border-gray-200 bg-white">
                    {filteredDevices.map((d) =>
                        <label
                            key={new Date().getTime() + d.id}
                            className={`flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 cursor-pointer ${d.location !== 'Unassigned' && d.location !== selectedZone?.name
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                                }`}
                        >
                            <input
                                type="checkbox"
                                disabled={d.location !== 'Unassigned' && d.location !== selectedZone?.name}
                                checked={selected.includes(d.id)}
                                onChange={() => toggle(d.id)}
                                className="h-4 w-4 rounded border-gray-400"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{d.name}</p>
                                <p className="text-xs text-gray-500">
                                    SN: {d.serialNumber} • {d.type}
                                </p>
                            </div>
                        </label>
                    )}

                    {filteredDevices.length === 0 && (
                        <p className="px-4 py-6 text-sm text-gray-500">
                            No devices match your search.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-medium">{selected.length}</span>{' '}
                        devices
                    </p>
                    <button
                        onClick={clearAll}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                    >
                        Clear All
                    </button>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-md bg-[#1E4288] px-4 py-2 text-sm font-medium text-white hover:bg-[#163568]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
}
