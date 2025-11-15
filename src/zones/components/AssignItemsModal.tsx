import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    open: boolean;
    zoneName: string;
    initialSelectedCodes: string[]; // Código de ítems pre-asignados
    onClose: () => void;
};

// Mock de INVENTARIO
const AVAILABLE_ITEMS = [
    { code: 'MED-001', name: 'Insulin Vial 10ml', qty: 45, unit: 'units' },
    { code: 'VAC-001', name: 'COVID-19 Vaccine', qty: 150, unit: 'doses' },
    { code: 'BLD-001', name: 'Blood Type O+', qty: 25, unit: 'units' },
    { code: 'LAB-001', name: 'Lab Reagent A', qty: 50, unit: 'ml' },
    { code: 'MED-002', name: 'Antibiotic Tablets', qty: 120, unit: 'tablets' },
];

export function AssignItemsModal({
    open,
    zoneName,
    initialSelectedCodes,
    onClose,
}: Props) {
    const [query, setQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>(initialSelectedCodes);

    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const toggle = (code: string) => {
        setSelectedItems((prev) =>
            prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
        );
    };

    const clearAll = () => setSelectedItems([]);

    const handleSave = () => {
        console.log('Assigned items :', selectedItems);
        alert('Item assignments saved ');
        onClose();
    };

    const filteredItems = AVAILABLE_ITEMS.filter((i) => {
        const q = query.toLowerCase();
        return (
            i.name.toLowerCase().includes(q) ||
            i.code.toLowerCase().includes(q) ||
            i.unit.toLowerCase().includes(q)
        );
    });

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
            onClick={handleBackdropClick}
        >
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
                    Assign inventory items to <span className="font-medium">{zoneName}</span>
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
                    {filteredItems.map((item) => {
                        const checked = selectedItems.includes(item.code);
                        return (
                            <label
                                key={item.code}
                                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggle(item.code)}
                                    className="h-4 w-4 rounded border-gray-400"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Code: {item.code} • {item.qty} {item.unit}
                                    </p>
                                </div>
                            </label>
                        );
                    })}

                    {filteredItems.length === 0 && (
                        <p className="px-4 py-6 text-sm text-gray-500">No items found.</p>
                    )}
                </div>

                {/* FOOTER */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Selected: <span className="font-medium">{selectedItems.length}</span> items
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
        </div>
    );
}
