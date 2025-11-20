// src/pages/zones/EditZoneModal.tsx  (ajusta la ruta según tu estructura)

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type EditZoneModalProps = {
    open: boolean;
    initialName: string;
    initialDescription?: string;
    onClose: () => void;
    onSave: (data: { name: string; description: string }) => void;
};

export function EditZoneModal({
    open,
    initialName,
    initialDescription = '',
    onClose,
    onSave,
}: EditZoneModalProps) {
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

    if (!open) return null;

    const handleSave = () => {
        onSave({ name, description });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                {/* Close (X) */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                    <CloseIcon fontSize="small" />
                </button>

                <h2 className="text-xl font-semibold mb-1">Edit Zone</h2>
                <p className="text-sm text-gray-600 mb-4">Update zone information</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Zone Name
                        </label>
                        <input
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4288]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Pharmacy Cold Storage"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            className="w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4288]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Optional description"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="rounded-md bg-[#1E4288] px-4 py-2 text-sm font-medium text-white hover:bg-[#163568]"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
