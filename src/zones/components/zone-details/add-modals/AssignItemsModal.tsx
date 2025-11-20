import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../shared/stores/globalstore';
import { useZoneStore } from '../../../stores/zone-store';

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AssignItemsModal({ open, onClose }: Props) {
    const [query, setQuery] = useState('');
    const { selectedZone, setSelectedZone, getZoneById } = useZoneStore();
    const { items, addItemToZone, removeItemFromZone, getItems } = useGlobalStore();
    const [original, setOriginal] = useState<number[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        const assignedItemsIds = items.filter(i =>
            selectedZone?.items.some(iz => iz.id === i.id)
        ).map(i => i.id);

        setOriginal(assignedItemsIds);
        setSelected(assignedItemsIds);
    }, [open]);

    const handleSave = async () => {
        const added = selected.filter(x => !original.includes(x));
        const removed = original.filter(x => !selected.includes(x));

        if (added.length > 0) {
            for (const itemId of added) {
                const item = items.find(i => i.id === itemId);

                if (item) {
                    await addItemToZone(selectedZone!, item);
                }
            }
        }

        if (removed.length > 0) {
            for (const itemId of removed) {
                const item = items.find(i => i.id === itemId);

                if (item) {
                    await removeItemFromZone(selectedZone!, item);
                }
            }
        }

        const updatedZone = await getZoneById(selectedZone!.id);
        setSelectedZone(updatedZone);
        await getItems();
        onClose();
    };

    const filteredItems = items.filter((i) => {
        const q = query.toLowerCase();
        return (
            i.name.toLowerCase().includes(q) ||
            i.code.toLowerCase().includes(q) ||
            i.unit.toLowerCase().includes(q)
        );
    });

    const toggle = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const clearAll = () => setSelected([]);

    return (
        <Modal open={open} onClose={onClose} className='flex justify-center items-center'>
            <div className="relative max-h-[90vh] w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-200"
                >
                    <CloseIcon fontSize="small" />
                </button>

                {/* TITLE */}
                <h2 className="text-xl font-semibold">Assign Items</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Assign inventory items to <span className="font-medium">{selectedZone?.name}</span>
                </p>

                {/* SEARCH */}
                <div className="mt-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search items..."
                            className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm"
                        />
                    </div>
                </div>

                {/* ITEMS LIST */}
                <div className="mt-4 max-h-[340px] overflow-y-auto rounded-xl border border-gray-200">
                    {filteredItems.map((i) =>
                        <label
                            key={i.code}
                            className={`flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 cursor-pointer ${i.location !== 'Unassigned' && i.location !== selectedZone?.name
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                                }`}
                        >
                            <input
                                type="checkbox"
                                disabled={i.location !== 'Unassigned' && i.location !== selectedZone?.name}
                                checked={selected.includes(i.id)}
                                onChange={() => toggle(i.id)}
                                className="h-4 w-4 rounded border-gray-400"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{i.name}</p>
                                <p className="text-xs text-gray-500">
                                    Code: {i.code} • {i.quantity} {i.unit}
                                </p>
                            </div>
                        </label>
                    )}

                    {filteredItems.length === 0 && (
                        <p className="px-4 py-6 text-sm text-gray-500">No items found.</p>
                    )}
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-medium">{selected.length}</span> items
                    </p>

                    <button
                        onClick={clearAll}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                    >
                        Clear All
                    </button>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
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
        </Modal >
    );
}
