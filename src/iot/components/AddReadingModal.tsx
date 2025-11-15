import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../shared/stores/globalstore";
import type { Createreading } from "../model/createreading";
import type { Iot } from "../model/iot";

interface AddReadingModalProps {
    open: boolean;
    onClose: () => void;
    device: Iot | null;
}

export function AddReadingModal({ open, onClose, device }: AddReadingModalProps) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const { createDeviceReading } = useGlobalStore();

    useEffect(() => {
        if (open) setValue("");
    }, [open]);

    if (!device) return null;

    const handleSubmit = async () => {
        if (!value.trim()) {
            return;
        }

        try {
            setLoading(true);
            const newReading: Createreading = {
                deviceId: device.id,
                value: value.trim(),

            };
            await createDeviceReading(newReading);

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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    maxWidth: 450,
                    outline: "none",
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Add Reading</h3>
                        <p className="text-sm text-[#67737C]">
                            {device.name} · {device.serialNumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#67737C] hover:text-gray-800 text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#67737C] mb-1">
                        Value
                    </label>
                    <input
                        placeholder="e.g. 4.2°C, 70%, OK"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00648E] focus:border-transparent"
                    />
                </div>

                {/* Actions */}
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
                        {loading ? "Saving..." : "Add Reading"}
                    </button>
                </div>
            </Box>
        </Modal>
    );
}
