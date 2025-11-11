import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import type { InventoryItem } from '../model/types';

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (item: InventoryItem) => void;
    nextId: string; // p.ej. "INV-006"
};

const CATEGORIES: InventoryItem['category'][] = ['Medications', 'Vaccines', 'Blood Products', 'PPE'];
const LOCATIONS: InventoryItem['location'][] = [
    'Pharmacy Cold Storage A', 'Laboratory Refrigerator', 'Storage Room C', 'Blood Bank Storage',
];

export function AddItemModal({ open, onClose, onSubmit, nextId }: Props) {
    const [form, setForm] = useState({
        name: '',
        category: '' as InventoryItem['category'] | '',
        batch: '',
        quantity: 0,
        unitLabel: '' as InventoryItem['unitLabel'] | '',
        expiryDate: '',
        location: '' as InventoryItem['location'] | '',
        supplier: '',
    });

    const dlgRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    // Cerrar con ESC
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (open) window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [open, onClose]);

    // Focus al abrir
    useEffect(() => { if (open) firstFieldRef.current?.focus(); }, [open]);

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.category || !form.batch || !form.unitLabel || !form.expiryDate || !form.location) return;

        const item: InventoryItem = {
            id: nextId,
            name: form.name.trim(),
            category: form.category,
            batch: form.batch.trim(),
            expiryDate: form.expiryDate, // yyyy-mm-dd
            quantity: Number(form.quantity),
            unitLabel: form.unitLabel,
            location: form.location,
            supplier: form.supplier?.trim() || undefined,
        };
        onSubmit(item);
    };

    return (
        <div
            className="fixed inset-0 z-50"
            aria-modal="true"
            role="dialog"
            aria-labelledby="add-item-title"
            onClick={(e) => {
                // cerrar si clic fuera del diálogo
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Dialog */}
            <div
                ref={dlgRef}
                className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 id="add-item-title" className="text-lg font-semibold">Add Inventory Item</h2>
                        <p className="text-sm text-gray-500">Register a new item in the inventory system</p>
                    </div>
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <CloseIcon fontSize="small" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Item Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Name</label>
                        <input
                            ref={firstFieldRef}
                            placeholder="e.g., Insulin Vials 100U/mL"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    {/* Category / Batch */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-700"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                            >
                                <option value="">Select category</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                            <input
                                placeholder="e.g., MED2024-A"
                                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                                value={form.batch}
                                onChange={(e) => setForm({ ...form, batch: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Quantity / Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                min={0}
                                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                                value={form.quantity}
                                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Unit</label>
                            <input
                                placeholder="e.g., vials"
                                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                                value={form.unitLabel}
                                onChange={(e) => setForm({ ...form, unitLabel: e.target.value as any })}
                                list="units"
                            />
                            <datalist id="units">
                                <option value="vials" />
                                <option value="doses" />
                                <option value="units" />
                                <option value="pieces" />
                                <option value="boxes" />
                            </datalist>
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="date"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={form.expiryDate}
                            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Storage Location</label>
                        <select
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3 text-gray-700"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value as any })}
                        >
                            <option value="">Select location</option>
                            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>

                    {/* Supplier */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Supplier</label>
                        <input
                            placeholder="e.g., PharmaCorp"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={form.supplier}
                            onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-10 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="h-10 px-5 rounded-md bg-[#1E4288] text-white hover:bg-[#163568]"
                        >
                            Add to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
