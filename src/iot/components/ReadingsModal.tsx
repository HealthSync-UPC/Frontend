import { Modal, Box } from '@mui/material';
import type { Iot } from '../model/iot';
import dayjs from "dayjs";

interface ReadingsModalProps {
    open: boolean;
    onClose: () => void;
    device: Iot | null;
}

export function ReadingsModal({ open, onClose, device }: ReadingsModalProps) {
    if (!device) return null;

    const readings = [...(device.readings ?? [])].sort((a, b) => {
        return dayjs(b.readingAt).valueOf() - dayjs(a.readingAt).valueOf();
    });

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
                    maxWidth: 700,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    outline: 'none',
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Readings - {device.name}
                        </h3>
                        <p className="text-sm text-[#67737C]">
                            Serial: {device.serialNumber} · Type: {device.type} · Location: {device.location}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-[#67737C] hover:text-gray-800 text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                {readings.length === 0 ? (
                    <div className="text-center text-[#67737C] py-8">
                        No readings yet for this device.
                    </div>
                ) : (
                    <div className="mt-2">
                        {/* Headers */}
                        <div className="grid grid-cols-2 font-medium border-b border-[#DFE6EB] pb-2 text-[#67737C] text-sm">
                            <span>Timestamp</span>
                            <span>Value</span>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[#DFE6EB] mt-2 text-sm text-[#040C13]">
                            {readings.map((r) => {
                                const formatted = dayjs(r.readingAt).format("DD-MM-YYYY h:mm:ss a");

                                return (
                                    <div key={r.id} className="grid grid-cols-2 items-center py-2">
                                        <span>{formatted}</span>
                                        <span>{r.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </Box>
        </Modal>
    );
}
