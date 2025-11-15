import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalStore } from "../../shared/stores/globalstore";
import type { Item } from "../model/item";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function AddItemModal({ open, onClose }: Props) {
    const { categories, addItem } = useGlobalStore();

    const [form, setForm] = useState<Omit<Item, "id" | "categoryName">>({
        categoryId: 0,
        name: "",
        code: "",
        description: "",
        quantity: 0,
        unit: "",
        active: true,
        location: "",
        expirationDate: undefined
    });

    const firstFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (open) window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [open, onClose]);

    useEffect(() => { if (open) firstFieldRef.current?.focus(); }, [open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const required = [
            form.name,
            form.code,
            form.description,
            form.unit,
            form.location,
            form.categoryId,
        ];

        if (required.some(field => !field)) return;

        await addItem({
            ...form,
            quantity: Number(form.quantity),
            expirationDate: form.expirationDate ? new Date(form.expirationDate) : undefined
        } as Item);

        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-item-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-5 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 id="add-item-title" className="text-lg font-semibold">Add Item</h2>
                        <p className="text-sm text-gray-500">Register a new inventory item</p>
                    </div>
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <CloseIcon fontSize="small" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            ref={firstFieldRef}
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            placeholder="e.g., Surgical Gloves"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Code</label>
                        <input
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            placeholder="e.g., GLV-2024-A"
                            value={form.code}
                            onChange={(e) => setForm({ ...form, code: e.target.value })}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={form.categoryId}
                            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                        >
                            <option value={0}>Select category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            placeholder="e.g., Latex-free surgical gloves"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
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
                                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                                placeholder="e.g., boxes"
                                value={form.unit}
                                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            placeholder="e.g., Storage Room A"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                        />
                    </div>

                    {/* Expiration Date (optional) */}
                    <div>
                        <label className="block text-sm font-medium">Expiration Date (optional)</label>
                        <input
                            type="date"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={form.expirationDate ? form.expirationDate.toString().substring(0, 10) : ""}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    expirationDate: e.target.value ? new Date(e.target.value) : undefined
                                })
                            }
                        />
                    </div>

                    {/* Active */}
                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="checkbox"
                            checked={form.active}
                            onChange={(e) => setForm({ ...form, active: e.target.checked })}
                        />
                        <label className="text-sm text-gray-700">Active</label>
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
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
