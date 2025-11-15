import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    open: boolean;
    zoneName: string;
    initialSelectedIds: string[]; // normalmente los seriales de los devices
    onClose: () => void;
};

type DeviceOption = {
    id: string;
    name: string;
    serial: string;
    type: string;
};

// Mock de dispositivos disponibles
const AVAILABLE_DEVICES: DeviceOption[] = [
    { id: 'SN-001', name: 'Temperature Sensor A1', serial: 'SN-001', type: 'Temperature' },
    { id: 'SN-002', name: 'Humidity Monitor H1', serial: 'SN-002', type: 'Humidity' },
    { id: 'SN-003', name: 'Door Sensor D1', serial: 'SN-003', type: 'Door' },
    { id: 'SN-004', name: 'Power Monitor P1', serial: 'SN-004', type: 'Power' },
    { id: 'SN-005', name: 'Combo Sensor C1', serial: 'SN-005', type: 'Combo' },
];

export function AssignDevicesModal({
    open,
    zoneName,
    initialSelectedIds,
    onClose,
}: Props) {
    const [query, setQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const toggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearAll = () => setSelectedIds([]);

    const handleSave = () => {
        console.log('Assigned devices :', selectedIds);
        alert('Device assignments saved ');
        onClose();
    };

    const filteredDevices = AVAILABLE_DEVICES.filter((d) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
            d.name.toLowerCase().includes(q) ||
            d.serial.toLowerCase().includes(q) ||
            d.type.toLowerCase().includes(q)
        );
    });

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
            onClick={handleBackdropClick}
        >
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
                    Assign IoT devices to <span className="font-medium">{zoneName}</span>
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
                    {filteredDevices.map((d) => {
                        const checked = selectedIds.includes(d.id);
                        return (
                            <label
                                key={d.id}
                                className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggle(d.id)}
                                    className="h-4 w-4 rounded border-gray-400"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{d.name}</p>
                                    <p className="text-xs text-gray-500">
                                        SN: {d.serial} • {d.type}
                                    </p>
                                </div>
                            </label>
                        );
                    })}

                    {filteredDevices.length === 0 && (
                        <p className="px-4 py-6 text-sm text-gray-500">
                            No devices match your search.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-medium">{selectedIds.length}</span>{' '}
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
        </div>
    );
}
