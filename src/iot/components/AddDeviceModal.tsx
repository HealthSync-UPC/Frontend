import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { Iot } from '../model/iot';
import { useGlobalStore } from '../../shared/stores/globalstore';

interface AddDeviceFormValues {
    name: string;
    serialNumber: string;
    type: string;
    location: string;
    status: string;
    unit: string;
}

interface AddDeviceFormProps {
    open: boolean;
    onClose: () => void;
}

export function AddDeviceModal({ open, onClose }: AddDeviceFormProps) {
    const [form, setForm] = useState<AddDeviceFormValues>({
        name: '',
        serialNumber: '',
        type: 'TEMPERATURE',
        location: '',
        status: 'ONLINE',
        unit: '°C',
    });

    const { createDevice } = useGlobalStore();
    const [loading, setLoading] = useState(false);

    const onChange =
        (k: keyof typeof form) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                let value = e.target.value;

                if (k === "type") {
                    if (value === "ACCESS_NFC") {
                        setForm((s) => ({
                            ...s,
                            type: value,
                            unit: ""
                        }));
                        return;
                    } else {
                        const defaultUnit =
                            value === "TEMPERATURE" ? "°C" :
                                value === "HUMIDITY" ? "%" :
                                    "";

                        setForm((s) => ({
                            ...s,
                            type: value,
                            unit: defaultUnit
                        }));
                        return;
                    }
                }

                setForm((s) => ({
                    ...s,
                    [k]: value,
                }));
            };

    const handleSubmit = async () => {
        const { name, serialNumber, type, location, status, unit } = form;

        if (!name || !serialNumber || !type || !location || !status) {
            return;
        }

        const finalUnit = type === "ACCESS_NFC" ? "" : unit;

        try {
            setLoading(true);

            const newDevice = new Iot(
                0,
                name,
                serialNumber,
                type,
                location,
                status,
                finalUnit,
                []
            );

            await createDevice(newDevice);

            setForm({
                name: '',
                serialNumber: '',
                type: 'TEMPERATURE',
                location: '',
                status: 'ONLINE',
                unit: '°C',
            });

            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white border rounded-lg p-6 shadow-lg"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 600,
                    outline: 'none',
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add New Device</h3>
                    <button
                        onClick={onClose}
                        className="text-[#67737C] hover:text-gray-800 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Device Name
                        </label>
                        <input
                            placeholder="e.g. Cold Storage A Monitor"
                            value={form.name}
                            onChange={onChange('name')}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                        />
                    </div>

                    {/* Serial Number */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Serial Number
                        </label>
                        <input
                            placeholder="e.g. TEMP-001"
                            value={form.serialNumber}
                            onChange={onChange('serialNumber')}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Type
                        </label>
                        <select
                            value={form.type}
                            onChange={onChange('type')}
                            className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                        >
                            <option value="TEMPERATURE">Temperature</option>
                            <option value="HUMIDITY">Humidity</option>
                            <option value="ACCESS_NFC">Access NFC</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Location
                        </label>
                        <input
                            placeholder="e.g. Pharmacy Cold Storage A"
                            value={form.location}
                            onChange={onChange('location')}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Status
                        </label>
                        <select
                            value={form.status}
                            onChange={onChange('status')}
                            className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                        >
                            <option value="ONLINE">Online</option>
                            <option value="OFFLINE">Offline</option>
                            <option value="WARNING">Warning</option>
                        </select>
                    </div>

                    {/* Unit */}
                    <div>
                        <label className="block text-sm font-medium text-[#67737C] mb-1">
                            Unit
                        </label>
                        <input
                            placeholder="e.g. °C, %, V"
                            value={form.unit}
                            onChange={onChange('unit')}
                            disabled={form.type === "ACCESS_NFC"}   // ← aquí se bloquea
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent ${form.type === "ACCESS_NFC" ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-[#00648E] text-white py-2 px-6 rounded-md hover:bg-[#005273] transition-colors disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Add Device'}
                    </button>
                </div>
            </Box>
        </Modal>
    );
}
