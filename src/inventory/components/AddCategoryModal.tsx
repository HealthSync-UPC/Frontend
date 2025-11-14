import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '../../shared/stores/globalstore';
import { Category } from '../model/category';

type Props = {
    open: boolean;
    onClose: () => void;
};


export function AddCategoryModal({ open, onClose }: Props) {
    const { addCategory } = useGlobalStore();
    const dlgRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);
    const [category, setCategory] = useState<Pick<Category, 'name' | 'description'>>({
        name: '',
        description: '',
    });


    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        if (open) window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [open, onClose]);

    useEffect(() => { if (open) firstFieldRef.current?.focus(); }, [open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!category.name || !category.description) return;

        await addCategory(category as Category);

        onClose();
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
                        <h2 id="add-item-title" className="text-lg font-semibold">Add Category</h2>
                        <p className="text-sm text-gray-500">Register a new category in the inventory system</p>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            ref={firstFieldRef}
                            placeholder="e.g., Medications"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={category.name}
                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            ref={firstFieldRef}
                            placeholder="e.g., All kinds of medications and drugs"
                            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3"
                            value={category.description}
                            onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        />
                    </div>

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
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
