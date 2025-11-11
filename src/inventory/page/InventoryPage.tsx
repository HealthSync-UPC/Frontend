import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import type { Filters, InventoryItem } from '../model/types';
import { SummaryCards } from '../components/SummaryCards';
import { FiltersCard } from '../components/FiltersCard';
import { ItemsCard } from '../components/ItemsCard';
import { AddItemModal } from '../components/AddItemModal';

// Mock inicial
const INITIAL: InventoryItem[] = [
    { id: 'INV-001', name: 'Insulin Humalog', category: 'Medications', batch: 'HUM2024-A', expiryDate: '2024-11-15', quantity: 45, unitLabel: 'vials', location: 'Pharmacy Cold Storage A' },
    { id: 'INV-002', name: 'COVID-19 Vaccine', category: 'Vaccines', batch: 'COV2024-B12', expiryDate: '2024-10-25', quantity: 1200, unitLabel: 'doses', location: 'Laboratory Refrigerator' },
    { id: 'INV-003', name: 'Blood Plasma Type O+', category: 'Blood Products', batch: 'BP2024-015', expiryDate: '2024-10-08', quantity: 12, unitLabel: 'units', location: 'Blood Bank Storage' },
    { id: 'INV-004', name: 'Surgical Masks N95', category: 'PPE', batch: 'N95-2024-C', expiryDate: '2025-06-30', quantity: 250, unitLabel: 'pieces', location: 'Storage Room C' },
    { id: 'INV-005', name: 'Antibiotics Amoxicillin', category: 'Medications', batch: 'AMX2024-D', expiryDate: '2024-10-03', quantity: 0, unitLabel: 'boxes', location: 'Pharmacy Cold Storage A' },
];

export function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>(INITIAL);
    const [filters, setFilters] = useState<Filters>({ query: '', category: 'All', location: 'All' });
    const [openAdd, setOpenAdd] = useState(false);

    const handleExport = () => {
        console.log('Exporting CSV…', items);
        alert('Exported (mock CSV)');
    };

    const nextId = `INV-${String(items.length + 1).padStart(3, '0')}`;

    const handleSubmitNew = (item: InventoryItem) => {
        setItems((prev) => [item, ...prev]);
        setOpenAdd(false);
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
                        onClick={() => setOpenAdd(true)}
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-[#1E4288] text-white hover:bg-[#163568]"
                    >
                        <AddIcon fontSize="small" />
                        Add Item
                    </button>
                </div>
            </div>

            {/* Cards, filtros y tabla */}
            <SummaryCards items={items} />
            <FiltersCard filters={filters} onChange={setFilters} />
            <ItemsCard items={items} filters={filters} />

            {/* Modal Add Item */}
            <AddItemModal open={openAdd} onClose={() => setOpenAdd(false)} onSubmit={handleSubmitNew} nextId={nextId} />
        </div>
    );
}

export default InventoryPage;
