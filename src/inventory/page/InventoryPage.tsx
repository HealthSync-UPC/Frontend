import AddIcon from '@mui/icons-material/Add';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useState } from 'react';
import { AddCategoryModal } from '../components/AddCategoryModal';
import { AddItemModal } from '../components/AddItemModal';
import { CategoriesTable } from '../components/CategoriesTable';
import { ItemsTable } from '../components/ItemsTable';
import type { Filters } from '../components/FiltersCard';

type InventoryTab = "items" | "categories";

export function InventoryPage() {
    const [filters, setFilters] = useState<Filters>({ query: '', category: 'All', location: 'All' });
    const [openAddItem, setOpenAddItem] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [tab, setTab] = useState<InventoryTab>("items");

    const handleExport = () => {
        console.log('Exporting CSV…');
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-2xl font-semibold">Inventory Management</p>
                    <p className="text-base text-[#67737C]">FEFO-compliant inventory tracking with expiry monitoring</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                        <DownloadOutlinedIcon fontSize="small" />
                        Export
                    </button>
                    <button
                        onClick={() => setOpenAddCategory(true)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[#1E4288] text-white hover:bg-[#163568]"
                    >
                        <AddIcon fontSize="small" />
                        Add Category
                    </button>
                    <button
                        onClick={() => setOpenAddItem(true)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[#1E4288] text-white hover:bg-[#163568]"
                    >
                        <AddIcon fontSize="small" />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="rounded-full bg-gray-100 p-1 inline-flex gap-1">
                <button
                    onClick={() => setTab("items")}
                    className={[
                        "px-4 py-1.5 rounded-full text-sm",
                        tab === "items" ? "bg-white shadow-sm" : "text-gray-600"
                    ].join(" ")}
                >
                    Items
                </button>

                <button
                    onClick={() => setTab("categories")}
                    className={[
                        "px-4 py-1.5 rounded-full text-sm",
                        tab === "categories" ? "bg-white shadow-sm" : "text-gray-600"
                    ].join(" ")}
                >
                    Categories
                </button>
            </div>

            {/* Content */}
            {tab === "items" && (
                <ItemsTable filters={filters} setFilters={setFilters} />
            )}

            {tab === "categories" && <CategoriesTable />}

            {/* Modals */}
            <AddItemModal open={openAddItem} onClose={() => setOpenAddItem(false)} />
            <AddCategoryModal open={openAddCategory} onClose={() => setOpenAddCategory(false)} />
        </div>
    );
}